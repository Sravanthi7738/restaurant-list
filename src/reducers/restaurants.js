import { UPDATE_RESTAURANTS } from "../actions/restaurants";
import { FIELD_NAME, SORT_TYPE } from "../constants/restaurrantsConstant";

const initState = {
    isLoading: true,
    list: []
};

const restaurantReducer = (state=initState, action) => {
    console.log(action)
    switch (action.type) {
        case UPDATE_RESTAURANTS: 
        return {...state, list: action.data, isLoading: false} 
        default:
        return state;
    }
}

export default restaurantReducer;