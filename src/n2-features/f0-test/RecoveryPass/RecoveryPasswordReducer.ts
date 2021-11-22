import axios from 'axios';
import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

import { setError, setInfo } from '../../../n1-main/m2-bll/ErrorReducer';

export type initRecoveryPasswordStateType = {
  password: string;
  token: string | undefined;
};

const initRecoveryPasswordState = {
  password: '',
  token: '',
};

export const RecoveryPasswordReducer = (
  // eslint-disable-next-line
  state: initRecoveryPasswordStateType = initRecoveryPasswordState,
  action: ActionTypes,
): initRecoveryPasswordStateType => {
  switch (action.type) {
    case 'SET_PASSWORD_CASE':
    case 'SET_TOKEN_CASE': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export const setTokenAction = (token: string) =>
  ({
    type: 'SET_TOKEN_CASE',
    payload: { token },
  } as const);
export const setPasswordAction = (password: string) =>
  ({
    type: 'SET_PASSWORD_CASE',
    payload: { password },
  } as const);

export const recoveryPasswordThunk =
  (password: string, token: string) => (dispatch: Dispatch) => {
    API.forgetPassword
      .changePasswordOnForget(password, token)
      .then(res => {
        dispatch(setInfo(true, res.data.info));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          dispatch(setError(true, err.response.data.error));
        }
        dispatch(setError(true, err.toJSON().message));
      });
  };

export type setPasswordActionType = ReturnType<typeof setTokenAction>;
export type setTokenActionType = ReturnType<typeof setPasswordAction>;

export type ActionTypes = setPasswordActionType | setTokenActionType;
