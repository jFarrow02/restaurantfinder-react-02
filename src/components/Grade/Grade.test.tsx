import { render } from '@testing-library/react';
import Grade from './Grade';
import GradeInterface from '../../interfaces/GradeInterface';

const mockProps: GradeInterface = {
    grade: 'X+',
    score: -1,
    date: Date.now(),
};

test('should render placeholder text', () => {
    const { getByText } = render(<Grade {...mockProps}/>);
    expect(getByText('Grade goes here')).toBeInTheDocument();
});