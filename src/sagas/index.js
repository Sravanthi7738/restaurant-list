import restaurantSaga from "./restaurantSaga";
import { fork } from "redux-saga/effects";

export default function* rootSaga () {
    yield [
        fork(restaurantSaga), 
    ];
}

