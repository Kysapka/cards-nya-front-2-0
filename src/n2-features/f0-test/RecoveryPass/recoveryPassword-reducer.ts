import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

export type initRecoveryPasswordStateType = {
  password: string;
  token: string | undefined;
  info: string | null;
  error: string | null;
};

const initRecoveryPasswordState = {
  password: '',
  token: '',
  info: null,
  error: null,
};

export const RecoveryPasswordReducer = (
  // eslint-disable-next-line
  state: initRecoveryPasswordStateType = initRecoveryPasswordState,
  action: ActionTypes,
): initRecoveryPasswordStateType => {
  switch (action.type) {
    case 'SET_PASSWORD_CASE':
    case 'SET_TOKEN_CASE':
    case 'SET_ERROR_CASE':
    case 'SET_INFO_CASE': {
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
export const setErrorAction = (error: string) =>
  ({
    type: 'SET_ERROR_CASE',
    payload: { error },
  } as const);
export const setInfoAction = (info: string) =>
  ({
    type: 'SET_INFO_CASE',
    payload: { info },
  } as const);

export const recoveryPasswordThunk =
  (password: string, token: string) => (dispatch: Dispatch) => {
    API.forgetPassword
      .changePasswordOnForget(password, token)
      .then(res => {
        dispatch(setInfoAction(res.data.info));
      })
      .catch(err => {
        dispatch(setErrorAction(err.response.data.error));
      });
  };

export type setPasswordActionType = ReturnType<typeof setTokenAction>;
export type setTokenActionType = ReturnType<typeof setPasswordAction>;
export type setErrorActionType = ReturnType<typeof setErrorAction>;
export type setInfoActionType = ReturnType<typeof setInfoAction>;

export type ActionTypes =
  | setPasswordActionType
  | setTokenActionType
  | setErrorActionType
  | setInfoActionType;
