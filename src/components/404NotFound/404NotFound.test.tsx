import { render, screen } from "@testing-library/react";
import NotFound from "./404NotFound";

test('renders placeholder text', () => {
    const { container, getByText } = render(<NotFound/>);
    expect(getByText('404 Not Found')).toBeInTheDocument();
    
});