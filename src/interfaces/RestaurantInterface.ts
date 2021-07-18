import AddressInterface from './AddressInterface';
import GradeInterface from './GradeInterface';

export default interface RestaurantInterface {
    address: AddressInterface,
    borough: string,
    grades: GradeInterface[],
    cuisineType: string,
    name: string,
    restaurant_id: string,
}