export function getRandomNumber(max) {
  return Math.floor((Math.random() * max));
}
export function getNextRoundRobin(total, current) {
  if (current < total - 1) {
    return (current + 1);
  }
  return 0;
}
