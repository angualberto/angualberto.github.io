const panels = {
  a: createPanel("a"),
  b: createPanel("b")
};

const modeEl = document.getElementById("mode");
const batchEl = document.getElementById("batch");
const rollEl = document.getElementById("roll");
const resetEl = document.getElementById("reset");
const exportEl = document.getElementById("export");

function createPanel(id) {
  const root = document.querySelector(`[data-rng="${id}"]`);
  return {
    root,
    bins: new Array(6).fill(0),
    total: 0,
    last: null,
    totalEl: root.querySelector("[data-total]"),
    lastEl: root.querySelector("[data-last]"),
    entropyEl: root.querySelector("[data-entropy]"),
    chiEl: root.querySelector("[data-chi]"),
    bars: root.querySelectorAll(".bar")
  };
}

function shannonEntropy(counts, total) {
  if (total === 0) return 0;
  let sum = 0;
  for (const c of counts) {
    if (c === 0) continue;
    const p = c / total;
    sum -= p * Math.log2(p);
  }
  return sum;
}

function chiSquare(counts, total) {
  if (total === 0) return 0;
  const expected = total / counts.length;
  let sum = 0;
  for (const c of counts) {
    const diff = c - expected;
    sum += (diff * diff) / expected;
  }
  return sum;
}

function addSample(panel, value) {
  const mode = modeEl.value;
  if (mode === "dice") {
    const idx = value - 1;
    panel.bins[idx] += 1;
    panel.last = value;
  } else {
    const idx = Math.min(5, Math.floor(value * 6));
    panel.bins[idx] += 1;
    panel.last = value.toFixed(6);
  }
  panel.total += 1;
}

function updatePanel(panel) {
  panel.totalEl.textContent = panel.total.toString();
  panel.lastEl.textContent = panel.last === null ? "-" : panel.last.toString();
  panel.entropyEl.textContent = shannonEntropy(panel.bins, panel.total).toFixed(3);
  panel.chiEl.textContent = chiSquare(panel.bins, panel.total).toFixed(3);

  panel.bars.forEach((bar, i) => {
    const h = panel.total === 0 ? 2 : (panel.bins[i] / panel.total) * 200;
    bar.style.height = `${Math.max(6, h)}px`;
  });
}

function resetPanel(panel) {
  panel.bins.fill(0);
  panel.total = 0;
  panel.last = null;
}

function downloadCSV() {
  const header = ["rng", "bin", "count", "total", "entropy", "chi_square"].join(",");
  const rows = [header];
  ["a", "b"].forEach((id) => {
    const panel = panels[id];
    const entropy = shannonEntropy(panel.bins, panel.total).toFixed(6);
    const chi = chiSquare(panel.bins, panel.total).toFixed(6);
    panel.bins.forEach((count, idx) => {
      rows.push([id, idx + 1, count, panel.total, entropy, chi].join(","));
    });
  });

  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rng_samples.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function init() {
  const statusA = document.getElementById("status-a");
  const statusB = document.getElementById("status-b");

  await MyRNG.ready;
  statusA.textContent = MyRNG.source;
  statusB.textContent = "Ativo";

  rollEl.addEventListener("click", () => {
    const batch = parseInt(batchEl.value, 10);
    for (let i = 0; i < batch; i += 1) {
      const mode = modeEl.value;
      const valueA = mode === "dice" ? MyRNG.nextInt(1, 6) : MyRNG.nextFloat();
      const valueB = mode === "dice" ? FallbackRNG.nextInt(1, 6) : FallbackRNG.nextFloat();
      addSample(panels.a, valueA);
      addSample(panels.b, valueB);
    }
    updatePanel(panels.a);
    updatePanel(panels.b);
  });

  resetEl.addEventListener("click", () => {
    resetPanel(panels.a);
    resetPanel(panels.b);
    updatePanel(panels.a);
    updatePanel(panels.b);
  });

  exportEl.addEventListener("click", downloadCSV);

  updatePanel(panels.a);
  updatePanel(panels.b);
}

init();
