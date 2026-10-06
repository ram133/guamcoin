#!/bin/bash
echo "=== GUAMCOIN MANUAL TRANSACTION GATEWAY ==="
git fetch origin main
git log origin/main..main --oneline
read -p "Authorize and push pending transactions? (y/N): " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    git push origin main
    echo "Transaction successfully approved and pushed."
else
    echo "Transaction push aborted by operator."
fi
