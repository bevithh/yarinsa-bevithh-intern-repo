import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageComponent from './MessageComponent';

describe('MessageComponent', () => {
  
  test('renders the initial message correctly', () => {
    render(<MessageComponent />);
    
    // Use getByRole for the heading - mimics how a screen reader sees it
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Hello, World!');
  });

  test('changes message when button is clicked', async () => {
    const user = userEvent.setup();
    render(<MessageComponent />);

    const button = screen.getByRole('button', { name: /update message/i });
    
    // Simulate user interaction
    await user.click(button);

    const updatedHeading = screen.getByRole('heading', { level: 1 });
    expect(updatedHeading).toHaveTextContent('Button Clicked!');
  });
});