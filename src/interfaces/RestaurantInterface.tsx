import AddressInterface from '../interfaces/AddressInterface';
import GradeInterface from '../interfaces/GradeInterface';

export default interface RestaurantInterface {
    address: AddressInterface,
    borough: string,
    grades: GradeInterface[],
    cuisineType: string,
    name: string,
    _id: string
}