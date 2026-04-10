import { calculateProgress } from './math.utils';

describe('math.utils', () => {
  
  test('should return 50 when completed is 5 and goal is 10', () => {
    // Arrange & Act
    const result = calculateProgress(5, 10);
    
    // Assert
    expect(result).toBe(50);
  });

  test('should return 0 when the goal is 0 to avoid division by zero', () => {
    const result = calculateProgress(5, 0);
    expect(result).toBe(0);
  });

  test('should return 100 when completed matches goal', () => {
    expect(calculateProgress(10, 10)).toBe(100);
  });
});