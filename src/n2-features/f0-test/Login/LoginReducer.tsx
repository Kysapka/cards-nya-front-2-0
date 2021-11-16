import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

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
  API.login.login(param).then(res => {
    console.log(res.data);
    dispatch(profileAction(res.data));
  });
  // .catch(err => {
  //   console.log('Error: ', err.response.data.error);
  // });
};

export type LoginActionTypes = ReturnType<typeof LoginAction>;
type ActionTypes = LoginActionTypes;
