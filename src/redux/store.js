

const restaurantsReducer = (state = [], action) => {
    return state;
};

const restaurantFinderAppState = (state = {}, action) => {
    return {
        restaurantsList: restaurantFinderAppState(state.restaurantsList, action),
    };
};

export default restaurantFinderAppState;