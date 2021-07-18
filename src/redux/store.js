import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    restaurantsList: [],
};

const RESTAURANTSLIST_FETCH = 'restaurantsList/fetch';

const restaurantsReducer = (state = initialState, action) => {
    switch(action.type){
        case RESTAURANTSLIST_FETCH:
            return { ...state, restaurantsList: action.payload };
        default:
            return state;
    }
};

const store = configureStore({ reducer: restaurantsReducer });

export default store;