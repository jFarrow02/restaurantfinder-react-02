import { render } from "@testing-library/react";
import Address from "./Address";
import AddressInterface from '../../interfaces/AddressInterface';

const mockProps: AddressInterface = {
    building: '1234',
    street: 'Main Street',
    zipcode: '12345',
    coordinates: [-12.3456789, 98.7654321],
};

test('renders placeholder text', () => {
    const { container, getByText } = render(<Address {...mockProps}/>);
    expect(getByText('Address goes here')).toBeInTheDocument();
})