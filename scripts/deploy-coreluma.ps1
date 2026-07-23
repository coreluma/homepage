param(
  [string]$HostName = "118.221.137.161",
  [int]$Port = 2222,
  [string]$UserName = "bobf",
  [string]$SiteRoot = "/var/www/coreluma",
  [string]$NginxConfig = "/etc/nginx/sites-available/coreluma-main",
  [string]$MainUrl = "https://coreluma.kr",
  [switch]$InstallDeps
)

$ErrorActionPreference = "Stop"

function Write-Step($Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-PythonCommand {
  $python = Get-Command python -ErrorAction SilentlyContinue
  if ($python) {
    try {
      & $python.Source --version *> $null
      if ($LASTEXITCODE -eq 0) {
        return @($python.Source)
      }
    } catch {
      # Ignore the non-executable WindowsApps alias and try other runtimes.
    }
  }

  $py = Get-Command py -ErrorAction SilentlyContinue
  if ($py) {
    return @($py.Source, "-3")
  }

  $bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
  if (Test-Path $bundledPython) {
    return @($bundledPython)
  }

  throw "Python 3 was not found. Install Python 3 and try again."
}

function Invoke-Python([string[]]$Arguments) {
  if ($pythonCmd.Length -eq 1) {
    & $pythonCmd[0] @Arguments
  } else {
    & $pythonCmd[0] $pythonCmd[1] @Arguments
  }
}

function ConvertTo-PlainText([securestring]$SecureString) {
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureString)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$pythonCmd = @(Get-PythonCommand)

Write-Step "Checking Python SSH dependency"
$previousErrorActionPreference = $ErrorActionPreference
try {
  $ErrorActionPreference = "Continue"
  Invoke-Python @("-c", "import paramiko") 2>$null
  $paramikoCheckExitCode = $LASTEXITCODE
} finally {
  $ErrorActionPreference = $previousErrorActionPreference
}

if ($paramikoCheckExitCode -ne 0) {
  Write-Step "Installing Paramiko"
  Invoke-Python @("-m", "pip", "install", "paramiko")
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to install Paramiko."
  }
}

if (-not $env:CORELUMA_SSH_PASSWORD) {
  $savedPassword = [Environment]::GetEnvironmentVariable(
    "CORELUMA_SSH_PASSWORD",
    [EnvironmentVariableTarget]::User
  )

  if ($savedPassword) {
    $env:CORELUMA_SSH_PASSWORD = $savedPassword
  }
}

if (-not $env:CORELUMA_SSH_PASSWORD) {
  $securePassword = Read-Host "SSH/sudo password" -AsSecureString
  $env:CORELUMA_SSH_PASSWORD = ConvertTo-PlainText $securePassword
}

Write-Step "Building Next.js static export"
node node_modules/next/dist/bin/next build
if ($LASTEXITCODE -ne 0) {
  throw "Next.js build failed."
}

if (-not (Test-Path "out/index.html")) {
  throw "out/index.html was not found. Static export output was not generated correctly."
}

$deployer = @'
import os
import pathlib
import posixpath
import time
import urllib.error
import urllib.request

import paramiko

host = os.environ["DEPLOY_HOST"]
port = int(os.environ["DEPLOY_PORT"])
user = os.environ["DEPLOY_USER"]
password = os.environ["CORELUMA_SSH_PASSWORD"]
site_root = os.environ["DEPLOY_SITE_ROOT"]
nginx_config = os.environ["DEPLOY_NGINX_CONFIG"]
main_url = os.environ["DEPLOY_MAIN_URL"]
local_root = pathlib.Path("out").resolve()
stamp = time.strftime("%Y%m%d%H%M%S")
remote_tmp = f"/home/{user}/coreluma-out-{stamp}"

if not local_root.exists():
    raise SystemExit("out/ directory not found")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(
    host,
    port=port,
    username=user,
    password=password,
    look_for_keys=False,
    allow_agent=False,
    timeout=20,
)

def run(command, sudo=False, timeout=180):
    full_command = command
    if sudo:
        full_command = "sudo -S -p '' bash -lc " + repr(command)

    stdin, stdout, stderr = client.exec_command(full_command, get_pty=False, timeout=timeout)
    if sudo:
        stdin.write(password + "\n")
        stdin.flush()

    out = stdout.read().decode("utf-8", "replace")
    err = stderr.read().decode("utf-8", "replace")
    code = stdout.channel.recv_exit_status()

    if code != 0:
        safe_err = err.replace(password, "***")
        safe_out = out.replace(password, "***")
        raise RuntimeError(f"remote command failed ({code}): {command}\n{safe_out}\n{safe_err}")

    return out

def ensure_remote_dir(sftp, path):
    parts = []
    current = path
    while current not in ("", "/"):
        parts.append(current)
        current = posixpath.dirname(current)

    for item in reversed(parts):
        try:
            sftp.stat(item)
        except FileNotFoundError:
            sftp.mkdir(item)

def upload_dir(sftp, source, destination):
    ensure_remote_dir(sftp, destination)
    uploaded = 0

    for item in source.rglob("*"):
        rel = item.relative_to(source).as_posix()
        remote_path = posixpath.join(destination, rel)

        if item.is_dir():
            ensure_remote_dir(sftp, remote_path)
            continue

        if item.is_file():
            ensure_remote_dir(sftp, posixpath.dirname(remote_path))
            sftp.put(str(item), remote_path)
            uploaded += 1

    return uploaded

try:
    print(f"Remote nginx config: {nginx_config}")
    run(f"test -f {nginx_config!r}")
    run("nginx -t", sudo=True, timeout=60)

    print(f"Uploading out/ to {remote_tmp}")
    run(f"mkdir -p {remote_tmp!r}")
    sftp = client.open_sftp()
    try:
        uploaded_count = upload_dir(sftp, local_root, remote_tmp)
    finally:
        sftp.close()

    print(f"Uploaded files: {uploaded_count}")
    print(f"Publishing to {site_root}")
    run(
        " && ".join(
            [
                f"mkdir -p {site_root!r}",
                f"rsync -a --delete {remote_tmp.rstrip('/') + '/'!r} {site_root.rstrip('/') + '/'!r}",
                f"chown -R www-data:www-data {site_root!r}",
                f"find {site_root!r} -type d -exec chmod 755 {{}} +",
                f"find {site_root!r} -type f -exec chmod 644 {{}} +",
            ]
        ),
        sudo=True,
        timeout=240,
    )
    run("nginx -t", sudo=True, timeout=60)
finally:
    try:
        run(f"rm -rf {remote_tmp!r}")
    except Exception as cleanup_error:
        print(f"Warning: temporary upload cleanup failed: {cleanup_error}")
    client.close()

request = urllib.request.Request(main_url, method="HEAD")
try:
    with urllib.request.urlopen(request, timeout=20) as response:
        print(f"{main_url} -> {response.status} {response.reason}")
        print(f"Server: {response.headers.get('Server', '')}")
        print(f"Content-Type: {response.headers.get('Content-Type', '')}")
except urllib.error.HTTPError as error:
    print(f"{main_url} -> {error.code} {error.reason}")
    raise

www_url = main_url.replace("https://", "https://www.", 1)
redirect_handler = urllib.request.HTTPRedirectHandler()
opener = urllib.request.build_opener(redirect_handler)
with opener.open(urllib.request.Request(www_url, method="HEAD"), timeout=20) as response:
    print(f"{www_url} final -> {response.status} {response.reason}")
    print(f"Final URL: {response.url}")

print("Deploy complete")
'@

$tmpDeployScript = Join-Path ([IO.Path]::GetTempPath()) "coreluma-deploy-$([Guid]::NewGuid().ToString('N')).py"
Set-Content -Path $tmpDeployScript -Value $deployer -Encoding UTF8

try {
  $env:DEPLOY_HOST = $HostName
  $env:DEPLOY_PORT = "$Port"
  $env:DEPLOY_USER = $UserName
  $env:DEPLOY_SITE_ROOT = $SiteRoot
  $env:DEPLOY_NGINX_CONFIG = $NginxConfig
  $env:DEPLOY_MAIN_URL = $MainUrl

  Write-Step "Uploading to server and verifying nginx"
  Invoke-Python @($tmpDeployScript)
  if ($LASTEXITCODE -ne 0) {
    throw "Deploy script failed."
  }
} finally {
  Remove-Item -LiteralPath $tmpDeployScript -Force -ErrorAction SilentlyContinue
  Remove-Item Env:\CORELUMA_SSH_PASSWORD -ErrorAction SilentlyContinue
}
