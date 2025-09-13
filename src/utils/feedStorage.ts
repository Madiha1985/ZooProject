
export function saveFedTime(id: number) {
  localStorage.setItem(`fedAt-${id}`, new Date().toISOString());
}

export function getFedTime(id: number): string | null {
  return localStorage.getItem(`fedAt-${id}`);
}
