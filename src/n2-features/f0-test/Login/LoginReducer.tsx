import { API } from '../../../n1-main/m3-dal/API';

export type initLoginStateType = {
  someProperty: string;
};

const initLoginState = {
  someProperty: '',
};

export const LoginReducer = (
  state: initLoginStateType = initLoginState,
  action: LoginActionTypes,
): initLoginStateType => {
  switch (action.type) {
    case 'LOGIN_CASE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const LoginAction = (param: string) =>
  ({ type: 'LOGIN_CASE', payload: { param } } as const);

export const testThunk = (param: string) => () => {
  API.appAPI
    .fakeRequest(param)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export type LoginActionTypes = ReturnType<typeof LoginAction>;
