export function getMatchEsit(goalsA: number, goalsB: number): '1' | 'X' | '2' {
  if (goalsA > goalsB) {
    return '1';
  }
  if (goalsA === goalsB) {
    return 'X';
  }
  return '2';
}