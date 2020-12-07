import { URLS } from "../constants/urlConstants";

export const getRestaurants = async() =>{
    const response = await fetch(URLS.RESTAURENTS, {headers: {'Authorization': "Api-Key q3MNxtfep8Gt"}});
    return response.json();
};