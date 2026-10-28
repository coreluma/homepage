$ErrorActionPreference = "Stop"

$server = "bobf@221.149.122.243"
$siteUrl = "https://coreluma.kr"
$archivePath = Join-Path ([System.IO.Path]::GetTempPath()) "coreluma-deploy-$PID.tar.gz"

function Invoke-Checked {
    param(
        [Parameter(Mandatory = $true)]
        [scriptblock]$Command,
        [Parameter(Mandatory = $true)]
        [string]$FailureMessage
    )

    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw $FailureMessage
    }
}

try {
    Write-Host "[1/4] Building Next.js static export..."
    Invoke-Checked { npm run build } "Next.js build failed."

    if (-not (Test-Path -LiteralPath "out/index.html")) {
        throw "out/index.html was not generated."
    }

    Write-Host "[2/4] Creating deployment archive..."
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }
    Invoke-Checked { tar -czf $archivePath -C out . } "Could not create the deployment archive."

    Write-Host "[3/4] Uploading and activating release..."
    $password = $env:CORELUMA_SSH_PASSWORD
    if (-not $password) {
        $password = [Environment]::GetEnvironmentVariable(
            "CORELUMA_SSH_PASSWORD",
            [EnvironmentVariableTarget]::User
        )
    }

    if (-not $password) {
        $securePassword = Read-Host "SSH/sudo password for $server" -AsSecureString
        $passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
        try {
            $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
        }
        finally {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
        }
    }

    try {
        $env:CORELUMA_DEPLOY_PASSWORD = $password
        Invoke-Checked {
            node scripts/deploy-remote.mjs $archivePath
        } "Server deployment failed."
    }
    finally {
        Remove-Item Env:CORELUMA_DEPLOY_PASSWORD -ErrorAction SilentlyContinue
        $password = $null
    }

    Write-Host "[4/4] Verifying public HTTPS endpoint..."
    Invoke-Checked { curl.exe -fSs -o NUL $siteUrl } "Public HTTPS health check failed."
    Invoke-Checked { curl.exe -fSs -o NUL -L "https://www.coreluma.kr" } "WWW redirect health check failed."

    Write-Host "Deployment complete: $siteUrl"
}
finally {
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }
}
