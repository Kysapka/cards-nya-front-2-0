import {
  ForGetPasswordReducer,
  RecoveryPasswordReducer,
} from 'n2-features/f0-test/RecoveryPass';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer } from '../../n2-features/f0-test';
import { ProfileReducer } from '../../n2-features/f0-test/Profile/Profile-Reducer';
import { RegistrationReducer } from '../../n2-features/f0-test/Registration/RegistrationReducer';

import { AppReducer } from './app-reducer';
import { ErrorReducer } from './ErrorReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  error: ErrorReducer,
  login: LoginReducer,
  // newPassword: NewPassowdReducer,
  profile: ProfileReducer,
  forgetPassword: ForGetPasswordReducer,
  registration: RegistrationReducer,
  recoveryPasswordReducer: RecoveryPasswordReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
