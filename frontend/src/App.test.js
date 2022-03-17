import { render, screen } from '@testing-library/react';
import App from './App';

test('should render login page', async () => {
    render(<App />);
    const element = screen.getByText(/login/i);
    // expect(element).toBeInTheDocument();
});
