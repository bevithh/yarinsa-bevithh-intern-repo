import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserDisplay from './UserDisplay';

// 1. Mock the entire axios module
jest.mock('axios');

test('fetches and displays user name', async () => {
  // 2. Define what the mock should return
  const mockUser = { data: { name: 'Yarinsa Sukhontharat' } };
  axios.get.mockResolvedValue(mockUser);

  render(<UserDisplay />);

  // 3. Verify loading state exists initially
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // 4. Wait for the mock data to appear
  const userName = await waitFor(() => screen.getByText('Yarinsa Sukhontharat'));
  
  expect(userName).toBeInTheDocument();
  
  // 5. Verify the API was called with the correct URL
  expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
});