export function decodeObs(value: string): string {
  if (!value.startsWith('obs:')) return value;
  return atob([...value.slice(4)].reverse().join(''));
}
