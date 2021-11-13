import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer } from '../../n2-features/f0-test/Login/LoginReducer';
import { RegistrationReducer } from '../../n2-features/f0-test/Registration/RegistrationReducer';

import { AppReducer } from './app-reducer';
import {RecoveryPasswordReducer} from "../../n2-features/f0-test/RecoveryPass/RecoveryPassReducer";

const rootReducer = combineReducers({
  app: AppReducer,
  login: LoginReducer,
  // newPassword: NewPassowdReducer,
  // profile: ProfileReducer,
  // recoveryPassword: RecoveryPasswordReducer,
  registration: RegistrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
