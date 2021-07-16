import { render } from '@testing-library/react';
import Restaurant from './Restaurant';
import RestaurantInterface from '../../interfaces/RestaurantInterface';

const mockProps: RestaurantInterface = {

    name: 'The Rusty Nail',
    borough: 'Nowheresville',
    _id: '987654321',
    cuisineType: 'Pangolian',
    grades: [
        { date: Date.now(), score: -1, grade: 'X-' },
        { date: Date.now(), score: -1, grade: 'X-' },
    ],
    address: {
        street: 'Main Street',
        building: '1234',
        zipcode: '98765',
        coordinates: [ -12.3456789, 98.7654321],
    }
};

test('should render an h2 with the restaurant name', () => {
    const { container } = render(<Restaurant {...mockProps}/>);
    const header = container.querySelector('div.Restaurant > h2');
    expect(header).toHaveTextContent(mockProps.name);
});

test('should render a list of grades', () => {
   const { container } = render(<Restaurant {...mockProps}/>);
   const gradesList = container.querySelectorAll('div.Grade');
   expect(gradesList.length).toEqual(mockProps.grades.length);
});

test('should render the address', () => {
    const { container } = render(<Restaurant {...mockProps}/>);
    const address = container.querySelector('div.Address');
    expect(address).toHaveTextContent('Address goes here');
});