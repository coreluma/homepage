#!/bin/sh
set -eu

archive="/home/bobf/coreluma-deploy.tar.gz"
web_root="/var/www/coreluma"
stage="/var/www/.coreluma-stage-$$"
backup="/var/www/.coreluma-backup-$(date +%Y%m%d-%H%M%S)-$$"
nginx_file="/etc/nginx/sites-available/coreluma-main"
certificate_dir="/etc/letsencrypt/live/coreluma.kr"
certbot_tls_options="/etc/letsencrypt/options-ssl-nginx.conf"
certbot_dhparams="/etc/letsencrypt/ssl-dhparams.pem"

cleanup() {
  rm -rf -- "$stage"
}
trap cleanup EXIT INT TERM

if [ ! -f "$archive" ]; then
  echo "Deployment archive is missing: $archive" >&2
  exit 1
fi

echo "Renewing the Core Luma TLS certificate when needed..."
certbot renew --cert-name coreluma.kr --non-interactive

for tls_file in \
  "$certificate_dir/fullchain.pem" \
  "$certificate_dir/privkey.pem" \
  "$certbot_tls_options" \
  "$certbot_dhparams"; do
  if [ ! -f "$tls_file" ]; then
    echo "Required TLS file is missing: $tls_file" >&2
    exit 1
  fi
done

mkdir -p -- "$stage"
tar -xzf "$archive" -C "$stage"

if [ ! -f "$stage/index.html" ]; then
  echo "Deployment archive does not contain index.html" >&2
  exit 1
fi

chown -R www-data:www-data "$stage"
find "$stage" -type d -exec chmod 755 {} +
find "$stage" -type f -exec chmod 644 {} +

if [ -e "$web_root" ]; then
  mv -- "$web_root" "$backup"
fi
mv -- "$stage" "$web_root"

cat > "$nginx_file" <<'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name coreluma.kr www.coreluma.kr;
  return 301 https://coreluma.kr$request_uri;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  server_name www.coreluma.kr;

  ssl_certificate /etc/letsencrypt/live/coreluma.kr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/coreluma.kr/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header Content-Security-Policy "upgrade-insecure-requests" always;

  return 301 https://coreluma.kr$request_uri;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  server_name coreluma.kr;

  ssl_certificate /etc/letsencrypt/live/coreluma.kr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/coreluma.kr/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header Content-Security-Policy "upgrade-insecure-requests" always;

  root /var/www/coreluma;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }
}
EOF

ln -sfn "$nginx_file" /etc/nginx/sites-enabled/coreluma-main

rollback_release() {
  rm -rf -- "$web_root"
  if [ -e "$backup" ]; then
    mv -- "$backup" "$web_root"
  fi
}

if ! nginx -t; then
  rollback_release
  exit 1
fi

systemctl reload nginx

if ! curl -fsS --resolve coreluma.kr:443:127.0.0.1 https://coreluma.kr/ >/dev/null; then
  echo "Local HTTPS health check failed." >&2
  rollback_release
  systemctl reload nginx
  exit 1
fi

rm -f -- "$archive"
if [ -e "$backup" ]; then
  rm -rf -- "$backup"
fi

echo "Core Luma static release activated successfully."
