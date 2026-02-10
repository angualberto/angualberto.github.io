#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

emcc "${ROOT_DIR}/wasm/agle_wasm.c" \
  -O3 \
  -s STANDALONE_WASM=1 \
  -s EXPORTED_FUNCTIONS='["_agle_bytes","_malloc","_free"]' \
  -o "${ROOT_DIR}/lib/agle_wasm.wasm"

echo "WASM built at ${ROOT_DIR}/lib/agle_wasm.wasm"
