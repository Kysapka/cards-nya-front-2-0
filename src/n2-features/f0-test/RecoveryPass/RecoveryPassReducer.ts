import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

export type initRecoveryStateType = {
  email: string;
  toggle: boolean;
  error: boolean;
};

const initRecoveryState = {
  email: '',
  toggle: false,
  error: false,
};

export const ForGetPasswordReducer = (
  // eslint-disable-next-line
  state: initRecoveryStateType = initRecoveryState,
  action: RecoveryPassTypes,
): initRecoveryStateType => {
  switch (action.type) {
    case 'EMAIL_SET_CASE':
    case 'TOOGL_SET_CASE':
    case 'ERROR_SET_CASE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const SetEmailAction = (email: string) =>
  ({ type: 'EMAIL_SET_CASE', payload: { email } } as const);

export const SetTooglMailAction = (toggle: boolean) =>
  ({ type: 'TOOGL_SET_CASE', payload: { toggle } } as const);
export const SetErrorAction = (error: boolean) =>
  ({ type: 'ERROR_SET_CASE', payload: { error } } as const);

export const RecoveryPassThunk = (email: string) => (dispatch: Dispatch) => {
  dispatch(SetEmailAction(email));
  API.forgetPassword
    .forgetPassword(email)
    .then(res => {
      console.log(res);
      dispatch(SetTooglMailAction(true));
    })
    .catch(err => {
      dispatch(SetErrorAction(true));
      dispatch(SetTooglMailAction(true));
      console.log(err);
    });
};

export type RecoveryPassTypes =
  | SetEmailActionType
  | SetTooglMailActionType
  | SetErrorActionType;

export type SetEmailActionType = ReturnType<typeof SetEmailAction>;
export type SetErrorActionType = ReturnType<typeof SetErrorAction>;
export type SetTooglMailActionType = ReturnType<typeof SetTooglMailAction>;
