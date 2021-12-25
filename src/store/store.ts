import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { authReducer } from './reducers/auth-reducer';
import { appReducer } from './reducers/app-reducer';
import { packsReducer } from './reducers/packs-reducer';
import { cardsReducer } from './reducers/cards-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>

// @ts-ignore
window.store = store

