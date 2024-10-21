export function getGoalsScored(points: number): number {

  if (points >= 105 && points < 109) {
    return 10;
  }

  if (points >= 101 && points < 105) {
    return 9;
  }

  if (points >= 97 && points < 101) {
    return 8;
  }

  if (points >= 93 && points < 97) {
    return 7;
  }

  if (points >= 89 && points < 93) {
    return 6;
  }

  if (points >= 85 && points < 89) {
    return 5;
  }

  if (points >= 81 && points < 85) {
    return 4;
  }

  if (points >= 77 && points < 81) {
    return 3;
  }

  if (points >= 72 && points < 77) {
    return 2;
  }

  if (points >= 66 && points < 72) {
    return 1;
  }

  return 0;
}