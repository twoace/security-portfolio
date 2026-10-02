// Alle Client-Effekte an einem Ort. Läuft bei jedem Seitenwechsel neu (View Transitions).
// Wer "Bewegung reduzieren" im Betriebssystem aktiviert hat, bekommt alles statisch.

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Elemente mit [data-reveal] blenden beim Reinscrollen ein, Geschwister gestaffelt. */
function initReveal(): () => void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return () => {};
  }
  items.forEach((el) => {
    const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [];
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 80}ms`);
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Text in [data-typewriter] Zeichen für Zeichen tippen. */
function initTypewriter(): () => void {
  const timers: number[] = [];
  document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach((el) => {
    const text = el.dataset.typewriter ?? '';
    if (reducedMotion()) {
      el.textContent = text;
      return;
    }
    el.textContent = '';
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) timers.push(window.setTimeout(tick, 35 + Math.random() * 60));
    };
    timers.push(window.setTimeout(tick, 300));
  });
  return () => timers.forEach(clearTimeout);
}

/** Zahlen in [data-count] von 0 hochzählen, sobald sichtbar. */
function initCounters(): () => void {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reducedMotion()) return () => {};
  let raf = 0;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count);
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
  });
  els.forEach((el) => {
    el.textContent = '0';
    io.observe(el);
  });
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}

/** Glow-Effekt auf .card, der der Maus folgt (CSS-Variablen --mx/--my). */
function initCardGlow(): () => void {
  const onMove = (ev: PointerEvent) => {
    const card = (ev.target as HTMLElement).closest<HTMLElement>('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    card.style.setProperty('--my', `${ev.clientY - r.top}px`);
  };
  document.addEventListener('pointermove', onMove);
  return () => document.removeEventListener('pointermove', onMove);
}

/** Fortschrittsbalken oben (Fallback, falls CSS scroll-timeline nicht unterstützt wird). */
function initProgress(): () => void {
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  if (!bar || CSS.supports('animation-timeline: scroll()')) return () => {};
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  update();
  addEventListener('scroll', update, { passive: true });
  return () => removeEventListener('scroll', update);
}

/** Animiertes Netzwerk aus Knoten und Verbindungen im Hero. Reagiert auf die Maus. */
function initNetwork(): () => void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.network');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return () => {};

  const dpr = Math.min(devicePixelRatio || 1, 2);
  const mouse = { x: -9999, y: -9999 };
  let w = 0, h = 0, raf = 0;
  let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(70, (w * h) / 12000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const linkDist = 120;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      // Knoten weichen der Maus leicht aus
      const dx = n.x - mouse.x, dy = n.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < 100 && d > 0) {
        n.x += (dx / d) * 1.2;
        n.y += (dy / d) * 1.2;
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < linkDist) {
          ctx.strokeStyle = `rgba(63, 185, 80, ${(1 - d / linkDist) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = 'rgba(88, 166, 255, 0.8)';
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reducedMotion()) raf = requestAnimationFrame(draw);
  };

  const onMove = (ev: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = ev.clientX - r.left;
    mouse.y = ev.clientY - r.top;
  };
  const onLeave = () => { mouse.x = mouse.y = -9999; };

  resize();
  draw();
  addEventListener('resize', resize);
  canvas.parentElement?.addEventListener('pointermove', onMove);
  canvas.parentElement?.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(raf);
    removeEventListener('resize', resize);
    canvas.parentElement?.removeEventListener('pointermove', onMove);
    canvas.parentElement?.removeEventListener('pointerleave', onLeave);
  };
}

let cleanups: (() => void)[] = [];

document.addEventListener('astro:page-load', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [initReveal(), initTypewriter(), initCounters(), initCardGlow(), initProgress(), initNetwork()];
});
