import { URLS } from "../constants/urlConstants";

export const getRestaurants = async() =>{
    const response = await fetch(URLS.RESTAURENTS);
    return response.json();
};