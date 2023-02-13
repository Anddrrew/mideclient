export function objectsEqual(o1: object, o2: object): boolean {
  return (
    Object.keys(o1).length === Object.keys(o2).length &&
    Object.keys(o1).every((key) => o1[key as keyof typeof o1] === o2[key as keyof typeof o1])
  );
}

export function arraysEqual(a1: object[], a2: object[]): boolean {
  return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
}
