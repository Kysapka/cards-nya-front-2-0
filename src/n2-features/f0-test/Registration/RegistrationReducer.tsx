import { API } from 'n1-main/m3-dal';

export type initRegistrationStateType = {
  someProperty: string;
};

const initRegistrationState = {
  someProperty: '',
};

export const RegistrationReducer = (
  state: initRegistrationStateType = initRegistrationState,
  action: RegistrationActionType,
): initRegistrationStateType => {
  switch (action.type) {
    case 'REGISTRATION_CASE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const RegistrationAction = (param: string) =>
  ({ type: 'REGISTRATION_CASE', payload: { param } } as const);

export const RegistrationThunk = (param: string) => () => {
  API.registration
    .registration(param)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export type RegistrationActionType = ReturnType<typeof RegistrationAction>;
