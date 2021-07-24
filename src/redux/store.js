import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    restaurantsList: [],
    cuisineTypes: [],
    showSearch: true,
};

const RESTAURANTSLIST_FETCH = 'restaurantsList/fetch';
const CUISINETYPES_FETCH = 'cuisineTypes/fetch';
const SET_SHOW_SEARCH = 'search/set';

export const restaurantListFetchActionCreator = (payload = []) => {
    return { type: RESTAURANTSLIST_FETCH, payload };
};

export const cuisineTypesFetchActionCreator = (payload = []) => {
    return { type: CUISINETYPES_FETCH, payload };
};

export const searchSetActionCreator = (payload = true) => {
    return { type: SET_SHOW_SEARCH, payload };
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case CUISINETYPES_FETCH:
            return { ...state, cuisineTypes: action.payload };
        case RESTAURANTSLIST_FETCH:
            return { ...state, restaurantsList: action.payload };
        case SET_SHOW_SEARCH:
            return { ...state, showSearch: action.payload };
        default:
            return state;
    }
}

const store = configureStore({ reducer: appReducer });

export default store;