/* global AGLEWasm */

window.AGLEWasm = (function () {
  async function init() {
    if (window.Module && window.Module._agle_bytes) {
      return buildAdapter(window.Module);
    }

    const response = await fetch("lib/agle_wasm.wasm");
    const wasmBytes = await response.arrayBuffer();
    const module = await WebAssembly.instantiate(wasmBytes, {});
    return buildAdapter(module.instance);
  }

  function buildAdapter(instance) {
    const exports = instance.exports || instance;
    const memory = exports.memory;
    const agleBytes = exports.agle_bytes || exports._agle_bytes;
    const malloc = exports.malloc || exports._malloc;
    const free = exports.free || exports._free;

    if (!memory || !agleBytes) {
      throw new Error("WASM exports missing: memory or agle_bytes");
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

    return { getBytes };
  }

  return { init };
})();
