import AddressInterface from './AddressInterface';
import GradeInterface from './GradeInterface';

export default interface RestaurantInterface {
    address: AddressInterface,
    borough: string,
    grades: GradeInterface[],
    cuisine: string,
    name: string,
    restaurant_id: string,
}