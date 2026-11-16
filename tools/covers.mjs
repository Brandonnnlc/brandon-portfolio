// Generates designed poster covers for projects without screenshots.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/covers/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const W = 1600, H = 1000;
const mono = "font-family:'Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace";
const sans = "font-family:'Geist',Inter,Arial,sans-serif";

const grid = (c, a = 0.18) => {
  let s = "";
  for (let x = 0; x <= W; x += 100) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${c}" stroke-opacity="${a}"/>`;
  for (let y = 0; y <= H; y += 100) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${c}" stroke-opacity="${a}"/>`;
  return s;
};
const meta = (c, l, r, idx) => `
  <text x="64" y="86" fill="${c}" font-size="20" letter-spacing="3" style="${mono}">${l}</text>
  <text x="${W - 64}" y="86" fill="${c}" font-size="20" letter-spacing="3" text-anchor="end" style="${mono}">${r}</text>
  <text x="64" y="${H - 56}" fill="${c}" font-size="20" letter-spacing="3" style="${mono}">BL® / ${idx}</text>
  <text x="${W - 64}" y="${H - 56}" fill="${c}" font-size="20" letter-spacing="3" text-anchor="end" style="${mono}">SINGAPORE</text>`;
const title = (t, c, y = 760, size = 190, extra = "") =>
  `<text x="56" y="${y}" fill="${c}" font-size="${size}" font-weight="900" letter-spacing="-12" style="${sans}" ${extra}>${t}</text>`;

const posters = {
  azoth: () => {
    // exploded keyboard: stacked slanted layers
    let layers = "";
    const cols = ["#0b0b0a", "#2e54fe", "#1b1b19", "#f2eee7", "#2a2a27", "#ff6338", "#111"];
    for (let i = 0; i < 7; i++) {
      const y = 170 + i * 72;
      layers += `<g transform="translate(900 ${y}) skewX(-28)"><rect x="0" y="0" width="560" height="38" rx="6" fill="${cols[i]}" stroke="#f2eee7" stroke-opacity="0.25"/></g>`;
    }
    let keys = "";
    for (let r = 0; r < 5; r++) for (let k = 0; k < 15; k++) {
      keys += `<g transform="translate(${880 + k * 38 - r * 22} ${110 + r * 14}) skewX(-28)"><rect width="30" height="10" rx="2" fill="#f2eee7" fill-opacity="${0.9 - r * 0.12}"/></g>`;
    }
    return `<rect width="${W}" height="${H}" fill="#0f1012"/>${grid("#f2eee7", 0.08)}${keys}${layers}
      ${title("AZOTH", "#f2eee7")}<text x="62" y="850" fill="#2e54fe" font-size="56" font-weight="800" letter-spacing="-2" style="${sans}">TKL 87 — EXPLODED</text>
      ${meta("#8b8f99", "PRODUCT FILM / R3F", "09 LAYERS · 07 PARTS", "011")}`;
  },
  superlight: () => {
    // lattice shell: ellipse of hex holes
    let holes = "";
    for (let y = 0; y < 14; y++) for (let x = 0; x < 20; x++) {
      const cx = 820 + x * 42 + (y % 2) * 21, cy = 180 + y * 38;
      const dx = (cx - 1240) / 400, dy = (cy - 440) / 300;
      if (dx * dx + dy * dy < 1) holes += `<circle cx="${cx}" cy="${cy}" r="${13 - (dx * dx + dy * dy) * 6}" fill="#0f1012"/>`;
    }
    return `<rect width="${W}" height="${H}" fill="#f2eee7"/>${grid("#11110f", 0.14)}
      <ellipse cx="1240" cy="440" rx="400" ry="300" fill="#ff6338"/><ellipse cx="1240" cy="440" rx="400" ry="300" fill="none" stroke="#11110f" stroke-width="3"/>${holes}
      ${title("SUPER", "#11110f", 700)}${title("LIGHT", "#11110f", 870, 190, 'stroke="#11110f" stroke-width="3" fill="none"')}
      ${meta("#77736d", "PROCEDURAL 3D / THREE.JS", "VORONOI LATTICE", "012")}`;
  },
  halyard: () => {
    let waves = "";
    for (let i = 0; i < 9; i++) {
      const y = 520 + i * 42;
      waves += `<path d="M-50 ${y} C 300 ${y - 120 - i * 10}, 700 ${y + 120 + i * 10}, 1100 ${y - 40} S 1700 ${y + 60}, 1700 ${y}" fill="none" stroke="#2e54fe" stroke-opacity="${0.9 - i * 0.08}" stroke-width="${2 + i * 0.4}"/>`;
    }
    return `<rect width="${W}" height="${H}" fill="#ffffff"/>${grid("#2e54fe", 0.12)}${waves}
      <circle cx="1260" cy="300" r="170" fill="#2e54fe"/><circle cx="1260" cy="300" r="120" fill="#ffffff"/><circle cx="1260" cy="300" r="60" fill="#2e54fe"/>
      ${title("HALYARD", "#0b1a5e", 400, 170)}
      ${meta("#2e54fe", "LANDING SYSTEM / 2026", "BLUE ON WHITE", "013")}`;
  },
  prism: () => `
      <defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a38"/><stop offset="0.45" stop-color="#0e0e0d"/><stop offset="0.5" stop-color="#5a5a57"/><stop offset="0.55" stop-color="#0e0e0d"/><stop offset="1" stop-color="#262624"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="#08080a"/>${grid("#f2eee7", 0.06)}
      <g transform="translate(760 210) rotate(-12)"><rect width="720" height="450" rx="36" fill="url(#m)" stroke="#f2eee7" stroke-opacity="0.35"/><rect x="60" y="80" width="90" height="66" rx="10" fill="#c9a86a"/><text x="60" y="400" fill="#f2eee7" font-size="34" letter-spacing="8" style="${mono}">PRISM  ·  METAL</text></g>
      ${title("PRISM", "#f2eee7", 820, 230)}
      ${meta("#8b8f99", "CONFIGURATOR / FINTECH", "17G STAINLESS", "014")}`,
  vayrune: () => `
      <rect width="${W}" height="${H}" fill="#f3efe4"/>${grid("#1c2326", 0.12)}
      <rect x="900" y="0" width="700" height="${H}" fill="#dfff70"/>
      <text x="940" y="200" fill="#1c2326" font-size="24" letter-spacing="6" style="${mono}">EDITION 01 — 06</text>
      <g fill="#1c2326" style="${sans}" font-weight="900">
        <text x="940" y="420" font-size="180" letter-spacing="-10">01</text><text x="1180" y="420" font-size="180" letter-spacing="-10" fill="#304ee8">02</text>
        <text x="940" y="620" font-size="180" letter-spacing="-10" fill="none" stroke="#1c2326" stroke-width="3">03</text><text x="1180" y="620" font-size="180" letter-spacing="-10">04</text>
        <text x="940" y="820" font-size="180" letter-spacing="-10">05</text><text x="1180" y="820" font-size="180" letter-spacing="-10" fill="none" stroke="#1c2326" stroke-width="3">06</text>
      </g>
      ${title("VAY", "#1c2326", 560, 260)}${title("RUNE", "#1c2326", 800, 260)}
      ${meta("#77736d", "STREETWEAR CONCEPT", "CABINET GROTESK / SATOSHI", "015")}`,
  afterimage: () => {
    let bars = "";
    for (let i = 0; i < 40; i++) {
      const y = Math.floor(Math.random() * H), h = 2 + Math.random() * 18, x = Math.random() * 400, w = 300 + Math.random() * 1200;
      bars += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${i % 3 ? "#ff6338" : "#f2eee7"}" fill-opacity="${0.15 + Math.random() * 0.5}"/>`;
    }
    let scan = "";
    for (let y = 0; y < H; y += 6) scan += `<rect x="0" y="${y}" width="${W}" height="2" fill="#000" fill-opacity="0.35"/>`;
    return `<rect width="${W}" height="${H}" fill="#141210"/>${bars}
      ${title("AFTER", "#ff6338", 560, 220)}${title("IMAGE", "#f2eee7", 790, 220)}
      <text x="60" y="880" fill="#ff6338" font-size="22" letter-spacing="6" style="${mono}">&gt; DEGRADED TERMINAL v0.1 _ PRELAUNCH</text>
      ${title("AFTER", "#2e54fe", 554, 220, 'opacity="0.55"')}${scan}
      ${meta("#a09c94", "GRUNGE × Y2K / ATHLEISURE", "BUILT BY AGENT TEAM", "016")}`;
  },
  "f1-portal": () => {
    let tele = "";
    const chans = ["#1ec97a", "#ff6338", "#2e54fe", "#f2eee7"];
    chans.forEach((c, i) => {
      let d = `M 820 ${300 + i * 150}`;
      for (let x = 820; x <= 1540; x += 24) d += ` L ${x} ${300 + i * 150 + Math.sin(x / 60 + i) * 30 + (Math.random() - 0.5) * 20}`;
      tele += `<path d="${d}" fill="none" stroke="${c}" stroke-width="3"/>`;
    });
    return `<rect width="${W}" height="${H}" fill="#0a0c0b"/>${grid("#1ec97a", 0.08)}
      <path d="M 60 140 L 1540 140" stroke="#1ec97a" stroke-opacity="0.5"/>
      ${tele}
      <g style="${mono}" fill="#1ec97a" font-size="22" letter-spacing="4"><text x="820" y="260">THROTTLE</text><text x="820" y="410">BRAKE</text><text x="820" y="560">SPEED</text><text x="820" y="710">ERS</text></g>
      ${title("DRIVER", "#f2eee7", 620, 200)}${title("PORTAL", "#1ec97a", 830, 200)}
      ${meta("#6f7a75", "UI CONCEPT / TELEMETRY", "PIT WALL · GARAGE · STRATEGY", "017")}`;
  },
  "agent-manager": () => {
    let cards = "";
    const roles = ["BUILDER", "THINKER", "MANAGER"];
    roles.forEach((r, i) => {
      const x = 860 + i * 240;
      cards += `<rect x="${x}" y="180" width="210" height="620" rx="14" fill="#f2eee7" stroke="#11110f"/>
        <text x="${x + 20}" y="230" fill="#11110f" font-size="20" letter-spacing="4" style="${mono}">${r}</text>
        <circle cx="${x + 185}" cy="222" r="7" fill="${i === 2 ? "#ff6338" : "#1ec97a"}"/>`;
      for (let k = 0; k < 9; k++) cards += `<rect x="${x + 20}" y="${270 + k * 52}" width="${90 + ((k * 37 + i * 50) % 80)}" height="12" rx="6" fill="#11110f" fill-opacity="${k < 4 ? 0.8 : 0.2}"/>`;
    });
    return `<rect width="${W}" height="${H}" fill="#2e54fe"/>${grid("#ffffff", 0.14)}${cards}
      ${title("AGENT", "#ffffff", 560, 200)}${title("MANAGER", "#ffffff", 780, 160, 'stroke="#ffffff" stroke-width="3" fill="none"')}
      ${meta("#cdd6ff", "INTERNAL TOOL / ORCHESTRATION", "RUN FROM A PHONE", "018")}`;
  },
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
for (const [name, fn] of Object.entries(posters)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${fn()}</svg>`;
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: `${OUT}/${name}.png`, type: "png" });
  console.log("wrote", name);
}
await browser.close();
