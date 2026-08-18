"use client";

/**
 * Flips data-theme on <html> and remembers the choice; the boot script replays
 * it before first paint.
 *
 * Deliberately stateless. Both labels are rendered and CSS picks which one is
 * visible from the same theme resolution the tokens use — so the button reads
 * correctly during the static HTML's first paint, before React hydrates, and
 * there is no possible mismatch between label and palette.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the choice just won't survive a reload.
    }
  }

  return (
    <button type="button" onClick={toggle} className="btn-ghost">
      <span className="sr-only">Switch to </span>
      <span className="theme-label-dark">Dark</span>
      <span className="theme-label-light">Light</span>
    </button>
  );
}
