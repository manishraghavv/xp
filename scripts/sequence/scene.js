/* Procedural isometric scenes for the scroll-scrubbed image sequences.
 * Runs inside a browser page (see scripts/generate-sequences.mjs). Original artwork:
 * no photography, no text. window.renderFrame(kind, t) draws t in [0,1] onto #c. */
(function () {
  const W = 1920;
  const H = 1080;
  const cv = document.getElementById("c");
  const ctx = cv.getContext("2d");
  const DPR = cv.width / W;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const easeBack = (x) => {
    const c1 = 1.5;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  function hex(h) {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    const A = hex(a);
    const B = hex(b);
    return [0, 1, 2].map((i) => Math.round(lerp(A[i], B[i], t)));
  }
  const rgba = (c, a = 1) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  const shade = (c, k) => c.map((v) => clamp(Math.round(v * k), 0, 255));

  // ---- camera ----------------------------------------------------------------------
  let cam = { yaw: 0.6, S: 64, ox: W / 2, oy: H * 0.66 };
  function P(x, y, z) {
    const c = Math.cos(cam.yaw);
    const s = Math.sin(cam.yaw);
    const xr = x * c - z * s;
    const zr = x * s + z * c;
    return [cam.ox + (xr - zr) * 0.866 * cam.S, cam.oy + (xr + zr) * 0.5 * cam.S - y * cam.S, xr + zr];
  }

  function poly(pts, fill, stroke, lw, glow) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.lineWidth = lw || 1.2;
      ctx.strokeStyle = stroke;
      if (glow) {
        ctx.shadowColor = glow;
        ctx.shadowBlur = 14;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  /** Glassy box: top, left and right faces with gradients and a luminous edge. */
  function box(x, y, z, w, h, d, col, o) {
    o = o || {};
    const a = o.alpha === undefined ? 1 : o.alpha;
    if (a <= 0.01 || h <= 0.001) return;
    const x2 = x + w;
    const y2 = y + h;
    const z2 = z + d;
    const A = P(x, y2, z);
    const B = P(x2, y2, z);
    const C = P(x2, y2, z2);
    const D = P(x, y2, z2);
    const E = P(x2, y, z);
    const F = P(x2, y, z2);
    const G = P(x, y, z2);
    ctx.globalAlpha = a;
    const gl = (p, q, c0, c1) => {
      const g = ctx.createLinearGradient(p[0], p[1], q[0], q[1]);
      g.addColorStop(0, rgba(c0, o.glass ? 0.55 : 1));
      g.addColorStop(1, rgba(c1, o.glass ? 0.3 : 1));
      return g;
    };
    const edge = o.edge || rgba(shade(col, 1.9), 0.85);
    poly([D, G, F, C], gl(D, F, shade(col, 0.55), shade(col, 0.32)), edge, 1.1, o.glow); // right-front
    poly([B, C, F, E], gl(B, F, shade(col, 0.78), shade(col, 0.42)), edge, 1.1, o.glow); // left-front
    poly([A, B, C, D], gl(A, C, shade(col, 1.45), shade(col, 1.0)), edge, 1.4, o.glow); // top
    ctx.globalAlpha = 1;
  }

  function line3(a, b, col, alpha, lw, glow) {
    const p = P(a[0], a[1], a[2]);
    const q = P(b[0], b[1], b[2]);
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    ctx.lineTo(q[0], q[1]);
    ctx.strokeStyle = rgba(col, alpha);
    ctx.lineWidth = lw || 1.4;
    if (glow) {
      ctx.shadowColor = rgba(col, 1);
      ctx.shadowBlur = glow;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function dot3(p3, col, r, alpha) {
    const p = P(p3[0], p3[1], p3[2]);
    ctx.beginPath();
    ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(col, alpha);
    ctx.shadowColor = rgba(col, 1);
    ctx.shadowBlur = r * 4;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // ---- background ------------------------------------------------------------------
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = 256;
  grainCanvas.height = 256;
  (function () {
    const g = grainCanvas.getContext("2d");
    const img = g.createImageData(256, 256);
    let s = 1337;
    for (let i = 0; i < img.data.length; i += 4) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const v = (s >>> 24) & 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  })();

  function background(glowA, glowB, pulse) {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#04080F");
    g.addColorStop(0.5, "#0A1030");
    g.addColorStop(1, "#101B4D");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const orb = (x, y, r, c, a) => {
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, rgba(c, a));
      rg.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
    };
    orb(W * 0.78, H * 0.28, 640, glowA, 0.26 + pulse * 0.1);
    orb(W * 0.2, H * 0.72, 700, glowB, 0.2 + pulse * 0.08);
    orb(W * 0.5, H * 0.5, 520, [27, 46, 122], 0.35);
  }

  function floorGrid(alpha) {
    ctx.save();
    for (let i = -10; i <= 10; i++) {
      const fade = 1 - Math.abs(i) / 11;
      line3([i, 0, -10], [i, 0, 10], [90, 150, 255], alpha * 0.18 * fade, 1);
      line3([-10, 0, i], [10, 0, i], [90, 150, 255], alpha * 0.18 * fade, 1);
    }
    ctx.restore();
  }

  function finish(t, vig) {
    // vignette
    const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(2,4,12," + (vig || 0.55) + ")");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, W, H);
    // film grain / dither (also prevents banding in the gradients)
    ctx.save();
    ctx.globalAlpha = 0.045;
    ctx.globalCompositeOperation = "overlay";
    const pat = ctx.createPattern(grainCanvas, "repeat");
    ctx.fillStyle = pat;
    ctx.translate((t * 97) % 256, (t * 53) % 256);
    ctx.fillRect(-256, -256, W + 512, H + 512);
    ctx.restore();
  }

  function sorted(items) {
    return items.sort((a, b) => a.depth - b.depth);
  }

  // ---- HOME: the SAP landscape assembles around an S/4HANA core --------------------
  const HOME_COLORS = ["#3B82F6", "#7C5CFF", "#06B6D4", "#3B82F6", "#7C5CFF", "#06B6D4", "#3B82F6"];
  function renderHome(t) {
    cam = { yaw: lerp(0.35, 1.05, easeInOut(t)), S: 82, ox: W / 2, oy: H * 0.62 };
    const live = seg(t, 0.78, 1);
    background([6, 182, 212], [124, 92, 255], live);
    floorGrid(seg(t, 0, 0.12));

    const items = [];
    const baseA = easeOut(seg(t, 0, 0.12));
    items.push({
      depth: -100,
      draw: () => box(-4.6, -0.3, -4.6, 9.2, 0.3, 9.2, [24, 34, 82], { alpha: baseA, glass: true, edge: "rgba(120,170,255,0.5)" }),
    });
    const coreH = lerp(0.001, 2.0, easeOut(seg(t, 0.08, 0.3)));
    items.push({
      depth: 0,
      draw: () => box(-1.3, 0, -1.3, 2.6, coreH, 2.6, [6, 182, 212], { glow: "rgba(6,182,212,0.9)", glass: false }),
    });
    const ring = 3.5;
    const mods = [];
    for (let i = 0; i < 7; i++) {
      const ang = (i / 7) * Math.PI * 2 + 0.3;
      const mx = Math.cos(ang) * ring - 0.6;
      const mz = Math.sin(ang) * ring - 0.6;
      const start = 0.26 + i * 0.045;
      const k = seg(t, start, start + 0.16);
      const drop = (1 - easeBack(k)) * 6.5;
      const h = 0.7 + (i % 3) * 0.28;
      const col = hex(HOME_COLORS[i]);
      mods.push({ mx, mz, h, k });
      const proj = P(mx + 0.6, 0, mz + 0.6);
      items.push({
        depth: proj[2],
        draw: () => box(mx, drop, mz, 1.2, h, 1.2, col, { alpha: clamp(k * 2), glow: "rgba(" + col.join(",") + ",0.7)" }),
      });
    }
    items.push({ depth: 1000, draw: null });
    sorted(items).forEach((it) => it.draw && it.draw());

    // links, drawn progressively, then data pulses
    const linkK = easeOut(seg(t, 0.46, 0.72));
    mods.forEach((m, i) => {
      const from = [0, coreH, 0];
      const to = [m.mx + 0.6, m.h + 0.05, m.mz + 0.6];
      const mid = [lerp(from[0], to[0], linkK), lerp(from[1], to[1], linkK) + Math.sin(linkK * Math.PI) * 0.8, lerp(from[2], to[2], linkK)];
      if (linkK > 0.01) {
        line3(from, mid, [120, 200, 255], 0.9, 2, 12);
        if (t > 0.7) {
          const pk = (t * 5 + i * 0.37) % 1;
          const pp = [lerp(from[0], to[0], pk), lerp(from[1], to[1], pk) + Math.sin(pk * Math.PI) * 0.8, lerp(from[2], to[2], pk)];
          dot3(pp, [200, 240, 255], 4.5, 0.95);
        }
      }
    });

    // cloud / BTP layer above the landscape
    const cloudK = easeOut(seg(t, 0.62, 0.85));
    if (cloudK > 0.01) {
      box(-3.6, 4.1, -3.6, 7.2, 0.07, 7.2, [124, 92, 255], { alpha: cloudK * 0.8, glass: true, glow: "rgba(124,92,255,0.8)" });
      for (let i = 0; i < 9; i++) {
        const gx = -3 + (i % 3) * 3;
        const gz = -3 + Math.floor(i / 3) * 3;
        line3([gx, 4.1, gz], [gx, coreH + 0.2, gz * 0.4], [140, 120, 255], cloudK * 0.35, 1.2);
        dot3([gx, 4.2, gz], [210, 200, 255], 3.2, cloudK);
      }
    }
    finish(t, 0.5);
  }

  // ---- MIGRATION: legacy ECC stack converts to S/4HANA and goes live ----------------
  const LEGACY = ["#a77a2b", "#8c7a58", "#b58a34", "#7d6c4e", "#a77a2b"];
  const MODERN = ["#7C5CFF", "#3B82F6", "#06B6D4", "#3B82F6", "#7C5CFF"];
  function renderMigration(t) {
    cam = { yaw: lerp(0.45, 0.95, easeInOut(t)), S: 80, ox: W / 2, oy: H * 0.66 };
    const live = seg(t, 0.7, 1);
    const conv = seg(t, 0.3, 0.66);
    background(mix("#F59E0B", "#06B6D4", easeInOut(conv)), mix("#8c7a58", "#7C5CFF", easeInOut(conv)), live);
    floorGrid(0.9);

    box(-4.6, -0.3, -4.6, 9.2, 0.3, 9.2, [24, 34, 82], { glass: true, edge: "rgba(120,170,255,0.5)" });

    // 16 week markers around the platform, lighting up in sequence once live
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const rx = Math.cos(ang) * 5.3;
      const rz = Math.sin(ang) * 5.3;
      const lit = clamp((live * 16 - i) / 1.2);
      const c = lit > 0 ? [6, 182, 212] : [50, 64, 120];
      box(rx - 0.18, 0, rz - 0.18, 0.36, 0.18 + lit * 0.5, 0.36, c, {
        glow: lit > 0.1 ? "rgba(6,182,212,0.95)" : undefined,
        edge: lit > 0 ? "rgba(180,240,255,0.9)" : "rgba(90,110,180,0.5)",
      });
    }

    const items = [];
    const gap = lerp(0.06, 0.34, easeInOut(conv));
    const sweepY = lerp(-0.4, 4.4, easeInOut(conv));
    for (let i = 0; i < 5; i++) {
      const start = i * 0.05;
      const k = seg(t, start, start + 0.18);
      const drop = (1 - easeBack(k)) * 7;
      const yBase = 0.06 + i * (0.62 + gap);
      const flipAt = 0.06 + i * (0.62 + gap) + 0.3;
      const flipped = clamp((sweepY - flipAt) * 2.4);
      const col = mix(LEGACY[i], MODERN[i], easeInOut(flipped));
      const w = lerp(3.8, 3.4, easeInOut(flipped));
      const d = lerp(3.2, 3.0, easeInOut(flipped));
      const pulse = live > 0 ? 0.5 + 0.5 * Math.sin(t * 40 + i) : 0;
      const proj = P(0, yBase, 0);
      items.push({
        depth: proj[2] - i * 0.001,
        draw: () =>
          box(-w / 2, yBase + drop, -d / 2, w, 0.62, d, col, {
            alpha: clamp(k * 2.2),
            glow: flipped > 0.4 ? "rgba(" + col.join(",") + "," + (0.55 + pulse * 0.3) + ")" : undefined,
          }),
      });
    }
    sorted(items).forEach((it) => it.draw());

    // legacy wiring on the left side fades as the stack is converted
    const wire = 1 - easeInOut(conv);
    if (wire > 0.02 && t > 0.15) {
      for (let i = 0; i < 6; i++) {
        const z = -1.2 + i * 0.5;
        line3([-2.1, 0.2, z], [-2.1, 3.5, z], [245, 158, 11], wire * 0.45, 1.2);
      }
    }

    // conversion scanner sweeping upward
    if (conv > 0 && conv < 1) {
      const a = Math.sin(conv * Math.PI);
      const sy = sweepY;
      line3([-2.6, sy, -2.2], [2.6, sy, -2.2], [200, 245, 255], a, 3, 22);
      line3([2.6, sy, -2.2], [2.6, sy, 2.2], [200, 245, 255], a, 3, 22);
      line3([2.6, sy, 2.2], [-2.6, sy, 2.2], [200, 245, 255], a, 3, 22);
      line3([-2.6, sy, 2.2], [-2.6, sy, -2.2], [200, 245, 255], a, 3, 22);
    }

    // Fiori glass layer on top once converted
    const fk = easeOut(seg(t, 0.55, 0.74));
    if (fk > 0.01) {
      const topY = 0.06 + 5 * (0.62 + gap) + 0.15 - (1 - fk) * 1.5;
      box(-1.9, topY, -1.6, 3.8, 0.1, 3.2, [6, 182, 212], { alpha: fk * 0.85, glass: true, glow: "rgba(6,182,212,0.9)" });
      for (let i = 0; i < 6; i++) {
        const tx = -1.5 + (i % 3) * 1.05;
        const tz = -1.1 + Math.floor(i / 3) * 1.3;
        box(tx, topY + 0.1, tz, 0.85, 0.05, 1.0, [200, 235, 255], { alpha: fk * 0.7 });
      }
    }

    // live data columns
    if (live > 0) {
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * Math.PI * 2;
        const rr = 3.0 + (i % 3) * 0.35;
        const up = ((t * 3 + i * 0.173) % 1) * 5.2;
        dot3([Math.cos(ang) * rr, up, Math.sin(ang) * rr], [160, 235, 255], 3.2, live * (1 - up / 5.6));
      }
    }
    finish(t, 0.55);
  }

  window.renderFrame = function (kind, t) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (kind === "home") renderHome(t);
    else renderMigration(t);
  };
})();
