import axios from 'axios';
import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

import { setError, setInfo } from '../../../n1-main/m2-bll/ErrorReducer';

const REGISTRATION = '@@REGISTRATION_REDUCER/REGISTRATION';
const initRegistrationState = {
  email: '',
  password: '',
};

export const RegistrationReducer = (
  // eslint-disable-next-line
  state: initRegistrationStateType = initRegistrationState,
  action: RegistrationActionType,
): initRegistrationStateType => {
  switch (action.type) {
    case REGISTRATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const Registration = (email: string, password: string) =>
  ({ type: REGISTRATION, payload: { email, password } } as const);

export const RegistrationThunk =
  (email: string, password: string) => (dispatch: Dispatch) => {
    API.registration(email, password)
      .then(() => {
        dispatch(setInfo(true, 'registration succsess'));
        dispatch(Registration(email, password));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          dispatch(setError(true, err.response.data.error));
        }
        dispatch(setError(true, err.toJSON().message));
      });
  };

export type RegistrationActionType = ReturnType<typeof Registration>;
export type initRegistrationStateType = {
  email: string;
  password: string;
};
