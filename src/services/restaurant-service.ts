import { SERVER_HOST, SERVER_PORT } from '../config/constants/http';
import RestaurantInterface from '../interfaces/RestaurantInterface';

const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/restaurants`;

const RestaurantService = {

    async getRestaurantsByBorough(boroughName: string | null): Promise<RestaurantInterface[]> {
        const restaurants = await fetch(`${SERVER_URI}/find/borough/${boroughName}`);
        return restaurants.json();
    },

    async getRestaurantsByCuisineType(cuisineType: string | null): Promise<RestaurantInterface[]> {
        const restaurants = await fetch(`${SERVER_URI}/find/cuisine/${cuisineType}`);
        return restaurants.json();
    },

    async getRestaurantsByName(name: string | null): Promise<RestaurantInterface[]> {
        const restaurants = await fetch(`${SERVER_URI}/find/name/${name}`);
        return restaurants.json();
    },
};

export default RestaurantService;