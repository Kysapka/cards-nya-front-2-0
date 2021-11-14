import { ForGetPasswordReducer } from 'n2-features/f0-test/RecoveryPass';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer } from '../../n2-features/f0-test/Login/LoginReducer';
import { RecoveryPasswordReducer } from '../../n2-features/f0-test/RecoveryPass/recoveryPassword-reducer';
import { RegistrationReducer } from '../../n2-features/f0-test/Registration/RegistrationReducer';

import { AppReducer } from './app-reducer';

const rootReducer = combineReducers({
  app: AppReducer,
  login: LoginReducer,
  // newPassword: NewPassowdReducer,
  // profile: ProfileReducer,
  forgetPassword: ForGetPasswordReducer,
  registration: RegistrationReducer,
  recoveryPasswordReducer: RecoveryPasswordReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
