#include <stdint.h>
#include <stdlib.h>
#include <emscripten/emscripten.h>

// Placeholder RNG bridge for browser builds.
// Replace with AGLE C implementation when OpenSSL/SHAKE256 is ported to WASM.

EMSCRIPTEN_KEEPALIVE
void agle_bytes(uint8_t *out, int len) {
    if (out == NULL || len <= 0) {
        return;
    }
    emscripten_get_random_bytes(out, (size_t)len);
}
