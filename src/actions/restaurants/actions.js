import { FETCH_RESTAURANTS, UPDATE_RESTAURANTS } from "./actionType";

export const fetchRestaurants =() =>{
    return {
        type: FETCH_RESTAURANTS
    }
}


export const updateRestaurants =(data) =>{
    return {
        type: UPDATE_RESTAURANTS,
        data
    }
}