#!/usr/bin/env bash
# Netlify build: static site + conexiones-app export at /conexiones.
# Whitelist: solo lo que el sitio sirve. Los originales de camara, zips y
# documentos del repo NO se publican (bajan el deploy de ~222MB a ~7MB).
# Rollback del /conexiones nuevo: quitar el bloque [build] de netlify.toml.
set -euo pipefail

# 1. Build the Conexiones landing (static export, basePath /conexiones)
(cd conexiones-app && npm ci && npm run build)

# 2. Assemble the publish directory (whitelist)
rm -rf dist
mkdir dist
cp index.html dist/
cp -R img dist/img
cp -R js dist/js

# 3. The app at /conexiones
cp -R conexiones-app/out dist/conexiones
