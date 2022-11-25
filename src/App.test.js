import { render, screen } from '@testing-library/react';
import ProductApp from './ProductApp';

test('renders learn react link', () => {
  render(<ProductApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
