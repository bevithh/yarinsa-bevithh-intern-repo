import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 1. Define the Async Action
export const fetchHabits = createAsyncThunk('habits/fetch', async () => {
  // In a real app, this would be your API URL
  const response = await fetch('http://localhost:3000/habits');
  return response.json();
});

interface HabitsState {
  items: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HabitsState = { 
  items: [],
  status: 'idle' 
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
  },
  // 2. Handle the async states here
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const { addHabit } = habitsSlice.actions;
export default habitsSlice.reducer;