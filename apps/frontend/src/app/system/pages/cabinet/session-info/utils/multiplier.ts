

export const getMultiplier = (rank: number) => {
  if (rank === 1) {
    return rank * 1.75
  } else if (rank === 2) {
    return rank * 1.65;
  } else if (rank === 3) {
    return rank * 1.55;
  } else if (10 >= rank && rank >= 4) {
    return rank * 1.5;
  } else if (24 >= rank && rank >= 11) {
    return rank * 1.4;
  } else if (49 >= rank && rank >= 25) {
    return rank * 1.25;
  } else if (100 >= rank && rank >= 50) {
    return rank * 1.1;
  }

  return 1;
}
