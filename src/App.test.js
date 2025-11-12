import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Expense tracker heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Expense tracker/i);
  expect(headingElement).toBeInTheDocument();
});
