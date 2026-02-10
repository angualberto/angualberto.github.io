/* global AGLEWasm */

window.AGLEWasm = (function () {
  async function init() {
    // Passo 1: Verificar se está pré-carregado (Emscripten modular)
    if (window.Module && window.Module._agle_bytes) {
      console.log('[WASM] Module pre-loaded from window.Module');
      return buildAdapter(window.Module);
    }

    // Passo 2: Tentar fetch do arquivo .wasm
    try {
      console.log('[WASM] Fetching agle_wasm.wasm...');
      const response = await fetch("lib/agle_wasm.wasm");
      
      if (!response.ok) {
        console.warn(`[WASM] Fetch failed with status ${response.status}`);
        return null;
      }

      const wasmBytes = await response.arrayBuffer();
      console.log(`[WASM] Loaded ${(wasmBytes.byteLength / 1024).toFixed(2)} KB`);

      // Passo 3: Instanciar WASM com imports vazios (standalone)
      const module = await WebAssembly.instantiate(wasmBytes, {
        env: {},
        js: { mem: new WebAssembly.Memory({ initial: 256 }) }
      });
      
      console.log('[WASM] Instantiation successful');
      return buildAdapter(module.instance);
      
    } catch (e) {
      console.warn(`[WASM] Load failed:`, e.message);
      return null;
    }
  }

  function buildAdapter(instance) {
    const exports = instance.exports || instance;
    const memory = exports.memory;
    const agleBytes = exports.agle_bytes || exports._agle_bytes;
    const agleFpError = exports.agle_fp_error_raw || exports._agle_fp_error_raw;
    const malloc = exports.malloc || exports._malloc;
    const free = exports.free || exports._free;

    console.log('[WASM] Available exports:', Object.keys(exports).sort());

    if (!memory || !agleBytes) {
      console.warn('[WASM] Critical exports missing:', {
        memory: !!memory,
        agleBytes: !!agleBytes
      });
      return null;
    }

    function getBytes(len) {
      const ptr = malloc ? malloc(len) : 0;
      if (!ptr) {
        throw new Error("WASM malloc not available");
      }
      agleBytes(ptr, len);
      const bytes = new Uint8Array(memory.buffer, ptr, len);
      const out = new Uint8Array(bytes);
      if (free) {
        free(ptr);
      }
      return out;
    }

    function fpError(x) {
      if (!agleFpError) {
        throw new Error("WASM agle_fp_error_raw not available");
      }
      return agleFpError(x);
    }

    console.log('[WASM] Adapter built successfully');
    return { getBytes, fpError, agle_fp_error_raw: fpError };
  }

  return { init };
})();
