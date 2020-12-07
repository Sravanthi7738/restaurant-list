import { FETCH_RESTAURANTS, updateRestaurants } from "../actions/restaurants";
import { takeEvery, all, call, put } from 'redux-saga/effects';
import { getRestaurants } from "../api/getRestaurants";
import { FIELD_NAME } from "../constants/restaurrantsConstant";

export const restaurantsList = (state) => state.restaurants.list
function* fetchRestaurants(action) {   
    let restaurants = yield call(getRestaurants);
    yield put(updateRestaurants(restaurants.map(restaurant => ({...restaurant, [FIELD_NAME.GENRE]: restaurant[FIELD_NAME.GENRE].split(",")}))))
}


function* restaurantSaga() {
    yield all([
      takeEvery(FETCH_RESTAURANTS, fetchRestaurants),
    ]);
  }
  export default restaurantSaga;