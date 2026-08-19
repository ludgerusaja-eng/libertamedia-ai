#!/bin/bash
# ==============================================================================
# libertamedia.com — High-Speed Automated Deployment Hook for cPanel
# ==============================================================================

DEPLOYPATH="/home/libp7469/public_html"

echo "[$(date)] === STARTING FAST CPANEL DEPLOYMENT ==="

# 1. Initialize production .env if not exists
if [ ! -f "$DEPLOYPATH/.env" ] && [ -f "$DEPLOYPATH/.env.example" ]; then
    cp "$DEPLOYPATH/.env.example" "$DEPLOYPATH/.env" 2>/dev/null || true
fi

# 2. Ensure Apache/LiteSpeed SPA fallback .htaccess is active
if [ -f "$DEPLOYPATH/dist/.htaccess" ]; then
    cp -f "$DEPLOYPATH/dist/.htaccess" "$DEPLOYPATH/.htaccess"
fi

# 3. Ensure root index.html is in place for instant loading
if [ -f "$DEPLOYPATH/dist/index.html" ]; then
    cp -f "$DEPLOYPATH/dist/index.html" "$DEPLOYPATH/index.html"
fi

# 4. Set execution permissions for utility scripts
chmod +x "$DEPLOYPATH/scripts/backup.sh" "$DEPLOYPATH/scripts/setup_cpanel.sh" 2>/dev/null || true

# 5. Instant Phusion Passenger Node.js reload
mkdir -p "$DEPLOYPATH/tmp"
touch "$DEPLOYPATH/tmp/restart.txt"

echo "[$(date)] === CPANEL DEPLOYMENT COMPLETED (LIGHTNING SPEED) ==="
