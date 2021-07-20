import { SERVER_HOST, SERVER_PORT } from '../config/constants/http';
import CuisineTypeInterface from '../interfaces/CuisineInterface';

const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/cuisine-type`;

const CuisineService = {

    async getAllCuisineTypes():Promise<CuisineTypeInterface[]> {
        console.log(`${SERVER_URI}/find/all`);
        const data = await fetch(`${SERVER_URI}/find/all`);
        return data.json();
    },
}

export default CuisineService;