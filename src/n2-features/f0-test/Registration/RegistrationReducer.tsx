import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

const initRegistrationState = {
  email: '',
  password: '',
};

export const RegistrationReducer = (
  state: initRegistrationStateType = initRegistrationState,
  action: RegistrationActionType,
): initRegistrationStateType => {
  switch (action.type) {
    case 'REGISTRATION':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const Registration = (email: string, password: string) =>
  ({ type: 'REGISTRATION', payload: { email, password } } as const);

export const RegistrationThunk =
  (email: string, password: string) => (dispatch: Dispatch) => {
    API.registration(email, password)
      .then(res => {
        console.log(res);
        dispatch(Registration(email, password));
      })
      .catch(err => {
        console.log(err);
      });
  };

export type RegistrationActionType = ReturnType<typeof Registration>;
export type initRegistrationStateType = {
  email: string;
  password: string;
};
