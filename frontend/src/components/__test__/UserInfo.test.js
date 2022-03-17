import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicInfo from '../BasicInfo';

const Demo = () => {
    return (
        <p role="userEmail">demo@example.com</p>
    );
};

test('Show registered email on screen', () => {
    render(<Demo />)
    expect(screen.getByRole('userEmail').textContent).toBe('demo@example.com');
});

const Button = ({onClick, children}) => (
  <button role="edit" onClick={onClick}>{children}</button>
)

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick} />)
  fireEvent.click(screen.getByRole('edit'));
  expect(handleClick).toHaveBeenCalledTimes(1);
})
