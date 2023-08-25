export function TimeSpent(startAt: Date, submittedAt: Date): number {
  const timeDiff = submittedAt.getTime() - startAt.getTime();
  // Convert time difference to minutes or seconds as needed
  return Math.floor(timeDiff / 1000);
}
