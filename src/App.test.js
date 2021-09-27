import { render, screen } from '@testing-library/react';
import App from './App';

test('renders friend list', () => {
	render(<App />);
	const linkElement = screen.getByText(/friend list/i);
	expect(linkElement).toBeInTheDocument();
});
