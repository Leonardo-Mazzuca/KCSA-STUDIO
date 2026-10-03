let frame = 0;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView();
    return;
  }

  const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start - margin;
  const distance = Math.abs(end - start);
  const duration = Math.min(1800, Math.max(900, distance * 0.62));
  const started = performance.now();

  window.cancelAnimationFrame(frame);

  const tick = (now: number) => {
    const progress = Math.min(1, (now - started) / duration);
    window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
    if (progress < 1) frame = window.requestAnimationFrame(tick);
  };

  frame = window.requestAnimationFrame(tick);
}

export function onHashLinkClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement | null)?.closest("a[href^='#']");
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href || href === "#" || !document.getElementById(href.slice(1))) return;

  event.preventDefault();
  history.pushState(null, "", href);
  smoothScrollTo(href);
}
