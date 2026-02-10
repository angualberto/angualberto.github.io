// Placeholder RNG wrapper.
// Replace this module with your WASM or native binding when ready.

const MyRNG = {
  nextInt(min, max) {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const range = max - min + 1;
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return min + (buf[0] % range);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  nextFloat() {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] / 0xffffffff;
    }
    return Math.random();
  }
};

window.MyRNG = MyRNG;
