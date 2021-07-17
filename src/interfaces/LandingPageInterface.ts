import CuisineTypeInterface from './CuisineInterface';
import RestaurantInterface from './RestaurantInterface';

export interface LandingPageInterface {
    showBoroughSelect: boolean,
    selectedSearchMethod: string | null,
    searchValue: string | null,
    cuisineTypes: CuisineTypeInterface[],
    restaurantList: RestaurantInterface[],
};