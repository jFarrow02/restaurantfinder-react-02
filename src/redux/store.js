import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    restaurantListLocation: null,
    cuisineTypes: [],
    showSearch: true,
};

const RESTAURANT_LIST_LOCATION_SET = 'restaurantListLocation/set';
const CUISINETYPES_FETCH = 'cuisineTypes/fetch';
const SET_SHOW_SEARCH = 'search/set';

export const restaurantListLocationSetActionCreator = (payload = { x: null, y: null }) => {
    return { type: RESTAURANT_LIST_LOCATION_SET, payload };
};

export const cuisineTypesFetchActionCreator = (payload = []) => {
    return { type: CUISINETYPES_FETCH, payload };
};

export const searchSetActionCreator = (payload = true) => {
    return { type: SET_SHOW_SEARCH, payload };
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESTAURANT_LIST_LOCATION_SET:
            return { ...state, restaurantListLocation: action.payload };
        case CUISINETYPES_FETCH:
            return { ...state, cuisineTypes: action.payload };
        case SET_SHOW_SEARCH:
            return { ...state, showSearch: action.payload };
        default:
            return state;
    }
}

const store = configureStore({ reducer: appReducer });

export default store;