import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice(
    {
        name: 'restaurantsList',
        initialState: {
            restaurants: [],
        },
        reducers: {
            setRestaurants: (state, action) => {
                state.restaurants = action.payload;
            },
        },
    }
);

export const { setRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;