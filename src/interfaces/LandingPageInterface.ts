import CuisineTypeInterface from './CuisineInterface';
import RestaurantInterface from './RestaurantInterface';

export interface LandingPageInterface {
    showBoroughSelect: boolean,
    cuisineTypes: CuisineTypeInterface[],
    restaurantList: RestaurantInterface[],
};