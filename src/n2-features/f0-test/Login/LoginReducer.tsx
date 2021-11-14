import { API } from 'n1-main/m3-dal';

export type initLoginStateType = {
  someProperty: string;
};

const initLoginState = {
  someProperty: '',
};

export const LoginReducer = (
  // eslint-disable-next-line
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
  API.app
    .fakeRequest(param)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export type LoginActionTypes = ReturnType<typeof LoginAction>;
