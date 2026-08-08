/** Normalize pathname for aria-current matching (strip trailing slash except root). */
export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

/** Whether a nav href matches the current path (`/` exact; others by prefix). */
export function isNavActive(pathname: string, href: string): boolean {
  const path = normalizePathname(pathname);
  const target = normalizePathname(href);
  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
}
