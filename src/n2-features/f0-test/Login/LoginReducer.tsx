import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

import { LoginPost } from '../../../n1-main/m3-dal/API';

export type LoginStateType = {
  _id: string | null;
  email: string | null;
  name: string | null;
  avatar?: string | null;
  publicCardPacksCount: number | null; // количество колод
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean | null;
  verified: boolean | null; // подтвердил ли почту
  rememberMe: boolean | null;
  error?: string | null;
};

const initLoginState = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  publicCardPacksCount: null, // количество колод
  created: null,
  updated: null,
  isAdmin: null,
  verified: null, // подтвердил ли почту
  rememberMe: null,
  error: null,
};

export const LoginReducer = (
  // eslint-disable-next-line
  state: LoginStateType = initLoginState,
  action: LoginActionTypes,
): LoginStateType => {
  switch (action.type) {
    case 'LOGIN_CASE':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const LoginAction = (param: {}) => ({ type: 'LOGIN_CASE', data: param } as const);

export const testThunk = (param: LoginPost) => (dispatch: Dispatch) => {
  API.login
    .login(param)
    .then(res => {
      console.log(res.data);
      dispatch(LoginAction(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export type LoginActionTypes = ReturnType<typeof LoginAction>;
