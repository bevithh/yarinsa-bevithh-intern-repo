import habitsReducer, { addHabit, fetchHabits } from '../src/habits/habitsSlice';

// 1. Define the type at the top of the test file to match the slice
interface HabitsState {
  items: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

describe('habits reducer', () => {
  // 2. Add the type here so TypeScript knows these strings are Literals
  const initialState: HabitsState = { 
    items: [], 
    status: 'idle' 
  };

  it('should handle fetchHabits.pending', () => {
    const action = { type: fetchHabits.pending.type };
    const state = habitsReducer(initialState, action);
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchHabits.fulfilled', () => {
    const mockHabits = ['Meditation', 'Coding'];
    // 3. Make sure 'action' uses the 'any' type or exact type to bypass strict check
    const action = { type: fetchHabits.fulfilled.type, payload: mockHabits };
    const state = habitsReducer(initialState, action as any);
    
    expect(state.status).toEqual('succeeded');
    expect(state.items).toEqual(mockHabits);
  });
});