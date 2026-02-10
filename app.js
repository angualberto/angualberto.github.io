const bins = new Array(6).fill(0);
let total = 0;
let lastValue = null;

const totalEl = document.getElementById("total");
const lastEl = document.getElementById("last");
const entropyEl = document.getElementById("entropy");
const modeEl = document.getElementById("mode");
const batchEl = document.getElementById("batch");

function rngInt() {
  return MyRNG.nextInt(1, 6);
}

function rngUnit() {
  return MyRNG.nextFloat();
}

function addSample() {
  const mode = modeEl.value;
  if (mode === "dice") {
    const v = rngInt();
    const idx = v - 1;
    bins[idx] += 1;
    lastValue = v;
  } else {
    const v = rngUnit();
    const idx = Math.min(5, Math.floor(v * 6));
    bins[idx] += 1;
    lastValue = v.toFixed(6);
  }
  total += 1;
}

function updateStats() {
  totalEl.textContent = total.toString();
  lastEl.textContent = lastValue === null ? "-" : lastValue.toString();
  entropyEl.textContent = shannonEntropy(bins).toFixed(3);

  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, i) => {
    const h = total === 0 ? 2 : (bins[i] / total) * 200;
    bar.style.height = `${Math.max(6, h)}px`;
  });
}

function shannonEntropy(counts) {
  if (total === 0) return 0;
  let sum = 0;
  for (const c of counts) {
    if (c === 0) continue;
    const p = c / total;
    sum -= p * Math.log2(p);
  }
  return sum;
}

function resetAll() {
  bins.fill(0);
  total = 0;
  lastValue = null;
  updateStats();
}

document.getElementById("roll").addEventListener("click", () => {
  const batch = parseInt(batchEl.value, 10);
  for (let i = 0; i < batch; i += 1) {
    addSample();
  }
  updateStats();
});

document.getElementById("reset").addEventListener("click", resetAll);

updateStats();
