import axios from 'axios';
import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

import { preloaderToggle, setAuth } from '../../../n1-main/m2-bll/app-reducer';
import { setError } from '../../../n1-main/m2-bll/ErrorReducer';
import { LoginPostType } from '../../../n1-main/m3-dal/API';
import { profileAction } from '../Profile/Profile-Reducer';

export type LoginStateType = {
  isLogin: boolean;
};

const initLoginState = {
  isLogin: false,
};

export const LoginReducer = (
  // eslint-disable-next-line
  state: LoginStateType = initLoginState,
  action: ActionTypes,
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

export const loginInThunk = (param: LoginPostType) => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  API.login
    .login(param)
    .then(res => {
      dispatch(setAuth(true));
      dispatch(profileAction(res.data));
      dispatch(preloaderToggle(false));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(setAuth(false));
        dispatch(preloaderToggle(false));
        dispatch(setError(true, err.response.data.error));
      }
      dispatch(setError(true, err.toJSON().message));
    });
};

export type LoginActionTypes = ReturnType<typeof LoginAction>;
type ActionTypes = LoginActionTypes;