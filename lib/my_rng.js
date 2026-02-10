const FallbackRNG = {
  nextInt(min, max) {
    const range = max - min + 1;
    const buf = new Uint32Array(1);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(buf);
      return min + (buf[0] % range);
    }
    return Math.floor(Math.random() * range) + min;
  },

  nextFloat() {
    const buf = new Uint32Array(1);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(buf);
      return buf[0] / 0xffffffff;
    }
    return Math.random();
  }
};

async function loadAgleWasm() {
  if (!window.AGLEWasm || !window.AGLEWasm.init) {
    return null;
  }
  try {
    const instance = await window.AGLEWasm.init();
    return instance;
  } catch (err) {
    return null;
  }
}

const MyRNG = {
  source: "Fallback",
  ready: null,
  _wasm: null,

  nextInt(min, max) {
    const range = max - min + 1;
    const buf = this._getBytes(4);
    const value = (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];
    return min + (value >>> 0) % range;
  },

  nextFloat() {
    const buf = this._getBytes(4);
    const value = (buf[0] << 24) | (buf[1] << 16) | (buf[2] << 8) | buf[3];
    return (value >>> 0) / 0xffffffff;
  },

  _getBytes(n) {
    if (this._wasm) {
      return this._wasm.getBytes(n);
    }
    const buf = new Uint8Array(n);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(buf);
      return buf;
    }
    for (let i = 0; i < n; i += 1) {
      buf[i] = Math.floor(Math.random() * 256);
    }
    return buf;
  }
};

MyRNG.ready = (async () => {
  const wasm = await loadAgleWasm();
  if (wasm) {
    MyRNG._wasm = wasm;
    MyRNG.source = "AGLE WASM";
  } else if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    MyRNG.source = "WebCrypto";
  }
})();

window.MyRNG = MyRNG;
window.FallbackRNG = FallbackRNG;
