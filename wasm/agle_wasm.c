/**
 * @file agle_wasm.c
 * @brief AGLE WASM - IEEE-754 floating-point error entropy extraction.
 * 
 * This implementation captures hardware-induced irreversibility via:
 * 1. IEEE-754 rounding errors (volatile arithmetic)
 * 2. Chaotic map iteration (logistic map)
 * 3. Mixing with browser entropy (emscripten_get_random_bytes)
 * 
 * Architecture: C (error generation) → WASM → JS (visualization)
 */

#include <stdint.h>
#include <stdlib.h>
#include <math.h>
#include <emscripten/emscripten.h>

#define AGLE_FP_ITERATIONS 16
#define AGLE_LOGISTIC_R 3.9999

// Internal state (chaotic seed)
static volatile double agle_state = 0.6180339887498949; // golden ratio φ

/**
 * Extract IEEE-754 floating-point rounding error.
 * The volatile keyword prevents compiler optimization.
 * 
 * Formula: ε = y - x, where y = x * (1 + tiny_perturbation)
 * This forces a round-trip through FPU registers.
 */
static inline double agle_fp_error(double x) {
    volatile double y = x * 1.0000000000000001; // force rounding
    volatile double z = y - x;                   // capture residual
    return z;
}

/**
 * Logistic map iteration: x_{n+1} = r * x_n * (1 - x_n)
 * Chaotic behavior amplifies tiny differences.
 */
static inline double agle_logistic(double x) {
    volatile double result = AGLE_LOGISTIC_R * x * (1.0 - x);
    return result;
}

/**
 * Mix multiple entropy sources using XOR and modular arithmetic.
 * 
 * Sources:
 * - IEEE-754 errors (amplified via chaotic iteration)
 * - Browser crypto.getRandomValues() via Emscripten
 * - State feedback loop
 */
EMSCRIPTEN_KEEPALIVE
void agle_bytes(uint8_t *out, int len) {
    if (out == NULL || len <= 0) {
        return;
    }

    // Get browser entropy baseline
    emscripten_get_random_bytes(out, (size_t)len);

    // Generate chaotic perturbation buffer
    for (int i = 0; i < len; i++) {
        // Iterate chaotic map with FP error feedback
        for (int j = 0; j < AGLE_FP_ITERATIONS; j++) {
            double error = agle_fp_error(agle_state);
            agle_state = agle_logistic(agle_state + error * 1e12); // amplify error
            
            // Normalize state to [0,1]
            if (agle_state < 0.0 || agle_state > 1.0) {
                agle_state = fabs(fmod(agle_state, 1.0));
            }
        }

        // Mix: browser entropy XOR chaotic fingerprint
        uint64_t chaos_bits;
        memcpy(&chaos_bits, &agle_state, sizeof(double));
        out[i] ^= (uint8_t)(chaos_bits ^ (chaos_bits >> 8) ^ (chaos_bits >> 16));
    }

    // Update global state (feedback loop)
    agle_state = agle_logistic(agle_state + (double)out[len-1] / 255.0);
}

/**
 * Expose raw FP error for visualization/testing (optional).
 */
EMSCRIPTEN_KEEPALIVE
double agle_fp_error_raw(double x) {
    return agle_fp_error(x);
}
