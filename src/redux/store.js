import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    restaurantsList: [],
    cuisineTypes: [],
};

const RESTAURANTSLIST_FETCH = 'restaurantsList/fetch';
const CUISINETYPES_FETCH = 'cuisineTypes/fetch';

export const restaurantListFetchActionCreator = (payload = []) => {
    return { type: RESTAURANTSLIST_FETCH, payload };
};

export const cuisineTypesFetchActionCreator = (payload = []) => {
    return { type: CUISINETYPES_FETCH, payload };
};


const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case CUISINETYPES_FETCH:
            return { ...state, cuisineTypes: action.payload };
        case RESTAURANTSLIST_FETCH:
            return { ...state, restaurantsList: action.payload };
        default:
            return state;
    }
}

const store = configureStore({ reducer: appReducer });

export default store;