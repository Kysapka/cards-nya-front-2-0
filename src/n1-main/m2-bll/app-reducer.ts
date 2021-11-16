import { Dispatch } from 'redux';

import { LoginAction } from '../../n2-features/f0-test/Login/LoginReducer';
import { API } from '../m3-dal';

export type initAppStateType = {
  isAuth: boolean;
};

const SET_AUTH = '@@APP_REDUCER/SET_AUTH';
const initAppState = {
  isAuth: false,
};

export const AppReducer = (
  // eslint-disable-next-line
  state: initAppStateType = initAppState,
  action: AppActionTypes,
): initAppStateType => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};

export const setAuth = (isAuth: boolean) =>
  ({
    type: SET_AUTH,
    isAuth,
  } as const);

export const authMeThunk = () => (dispatch: Dispatch) => {
  API.app
    .getAuth()
    .then(res => {
      dispatch(setAuth(true));
      dispatch(LoginAction(res.data));
      console.log({ ...res });
    })
    .catch(err => {
      dispatch(setAuth(false));
      console.log({ ...err });
    });
};

export type testActionType = ReturnType<typeof setAuth>;
export type AppActionTypes = testActionType;
