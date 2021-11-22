import axios from 'axios';
import { API } from 'n1-main/m3-dal';
import { Dispatch } from 'redux';

import { setError, setInfo } from '../../../n1-main/m2-bll/ErrorReducer';

export type initRecoveryStateType = {
  email: string;
  toggle: boolean;
};

const initRecoveryState = {
  email: '',
  toggle: false,
};

export const ForGetPasswordReducer = (
  // eslint-disable-next-line
  state: initRecoveryStateType = initRecoveryState,
  action: RecoveryPassTypes,
): initRecoveryStateType => {
  switch (action.type) {
    case 'EMAIL_SET_CASE':
    case 'TOOGL_SET_CASE':
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

export const RecoveryPassThunk = (email: string) => (dispatch: Dispatch) => {
  dispatch(SetEmailAction(email));
  API.forgetPassword
    .forgetPassword(email)
    .then(resp => {
      dispatch(SetTooglMailAction(true));
      dispatch(setInfo(true, resp.data.info));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(setError(true, err.response.data.error));
        dispatch(SetEmailAction(err.response?.data.email));
        dispatch(SetTooglMailAction(true));
      }
      dispatch(setError(true, err.toJSON().message));
    });
};

export type RecoveryPassTypes = SetEmailActionType | SetTooglMailActionType;

export type SetEmailActionType = ReturnType<typeof SetEmailAction>;
export type SetTooglMailActionType = ReturnType<typeof SetTooglMailAction>;
