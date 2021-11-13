import { API } from 'n1-main/m3-dal';

export type initLoginStateType = {
  someProperty: string;
};

const initLoginState = {
  someProperty: '',
};

export const RecoveryPasswordReducer = (
  state: initLoginStateType = initLoginState,
  action: RecoveryPassTypes,
): initLoginStateType => {
  switch (action.type) {
    case 'RECOVERY_PASS_CASE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const RecoveryPassAction = (param: string) =>
  ({ type: 'RECOVERY_PASS_CASE', payload: { param } } as const);

export const RecoveryPassThunk = (param: string) => () => {
  API.recoveryPassword
    .recoveryPass(param)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export type RecoveryPassTypes = ReturnType<typeof RecoveryPassAction>;
