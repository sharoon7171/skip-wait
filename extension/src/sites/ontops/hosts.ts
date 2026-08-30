export function ontopsStPath(pathname = location.pathname): boolean {
  return /^\/st\/?$/i.test(pathname);
}
