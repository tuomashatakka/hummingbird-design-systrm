#!/usr/bin/env bash
# Static export build for GitHub Pages.
# API routes need a server runtime, so they are parked during the export build.
set -euo pipefail

API_DIR="src/app/api"
PARKED="/tmp/vibe-parked-api"

restore () { [ -d "$PARKED" ] && mv "$PARKED" "$API_DIR" || true; }
trap restore EXIT

[ -d "$API_DIR" ] && mv "$API_DIR" "$PARKED"

NEXT_OUTPUT=export \
NEXT_BASE_PATH="${NEXT_BASE_PATH:-}" \
bun x next build

touch out/.nojekyll
echo "✓ static export in ./out (basePath: '${NEXT_BASE_PATH:-/}')"
