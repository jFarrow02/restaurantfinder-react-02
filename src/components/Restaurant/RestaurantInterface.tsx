import AddressInterface from '../Address/AddressInterface';
import GradeInterface from '../Grade/GradeInterface';

export default interface RestaurantInterface {
    address: AddressInterface,
    borough: string,
    grades: GradeInterface[],
    cuisineType: string,
    name: string,
    _id: string
}