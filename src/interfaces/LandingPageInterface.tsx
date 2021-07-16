import { CuisineTypeInterface } from "./CuisineInterface";

export interface LandingPageInterface {
    showBoroughSelect: boolean,
    selectedSearchMethod: string | null,
    cuisineTypes: CuisineTypeInterface[],
}