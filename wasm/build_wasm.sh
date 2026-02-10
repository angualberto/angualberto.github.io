#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Build AGLE WASM with IEEE-754 error entropy extraction
emcc "${ROOT_DIR}/wasm/agle_wasm.c" \
  -O3 \
  -s WASM=1 \
  -s STANDALONE_WASM=1 \
  -s EXPORTED_FUNCTIONS='["_agle_bytes","_agle_fp_error_raw","_malloc","_free"]' \
  -s EXPORTED_RUNTIME_METHODS='["cwrap"]' \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ENVIRONMENT='web' \
  -lm \
  -o "${ROOT_DIR}/lib/agle_wasm.wasm"

echo "✓ WASM build complete: ${ROOT_DIR}/lib/agle_wasm.wasm"
echo "📊 Exports: agle_bytes(ptr, len), agle_fp_error_raw(x)"
