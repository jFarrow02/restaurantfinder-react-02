import { SERVER_HOST, SERVER_PORT } from '../config/constants/http';
import RestaurantInterface from '../interfaces/RestaurantInterface';

const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/restaurants`;

const RestaurantService = {

    async getRestaurantsByBorough(boroughName: any): Promise<any> {
        const restaurants = await fetch(`${SERVER_URI}/find/borough/${encodeURIComponent(boroughName)}`);
        return restaurants.json()
            .then(res => res.data);
    },

    async getRestaurantsByCuisineType(cuisineType: any): Promise<RestaurantInterface[]> {
        const restaurants = await fetch(`${SERVER_URI}/find/cuisine/${encodeURIComponent(cuisineType)}`);
        return restaurants.json()
            .then(res => res.data);
    },

    async getRestaurantsByName(name: any): Promise<RestaurantInterface[]> {
        const restaurants = await fetch(`${SERVER_URI}/find/name/${name}`);
        return restaurants.json()
            .then(res => res);
    },
};

export default RestaurantService;