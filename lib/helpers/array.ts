export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function intersect<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}
