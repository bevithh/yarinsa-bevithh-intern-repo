// A simple utility to calculate progress for Focus Bear habits
export const calculateProgress = (completed: number, goal: number): number => {
  if (goal === 0) return 0;
  return (completed / goal) * 100;
};