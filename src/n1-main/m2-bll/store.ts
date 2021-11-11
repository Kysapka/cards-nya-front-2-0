import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppReducer} from "./app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    app: AppReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))