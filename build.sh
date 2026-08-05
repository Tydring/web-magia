#!/usr/bin/env bash
# Netlify build: static site (repo root) + conexiones-app export at /conexiones.
# The exported app REPLACES the tracked conexiones/ page in the publish dir;
# the old page stays in git. Rollback: remove [build] from netlify.toml.
set -euo pipefail

# 1. Build the Conexiones landing (static export, basePath /conexiones)
(cd conexiones-app && npm ci && npm run build)

# 2. Assemble the publish directory
rm -rf dist
mkdir dist
for entry in * .[!.]*; do
  case "$entry" in
    dist|conexiones-app|node_modules|.git|build.sh) continue ;;
  esac
  [ -e "$entry" ] || continue
  cp -R "$entry" dist/
done

# 3. Swap in the app at /conexiones
rm -rf dist/conexiones
cp -R conexiones-app/out dist/conexiones
