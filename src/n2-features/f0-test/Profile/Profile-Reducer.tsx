import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { AppRootStateType } from '../../../n1-main/m2-bll';
import { AppActionTypes, preloaderToggle } from '../../../n1-main/m2-bll/app-reducer';
import { authMeThunk } from '../../../n1-main/m2-bll/AppThunks';
import { ErrorActionTypes, setError } from '../../../n1-main/m2-bll/ErrorReducer';
import { API } from '../../../n1-main/m3-dal';

const LOG_OUT = '@@PROFILE_REDUCER/LOG_OUT_CLEAR_STATE';

export type ProfileStateType = {
  _id: string | null;
  email: string | null;
  password: string | null;
  rememberMe: boolean | null;
  isAdmin: boolean | null;
  name: string | null;
  verified: boolean | null;
  avatar?: string | null;
  publicCardPacksCount: number | null;
  token?: string | null;
  tokenDeathTime?: number | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenDeathTime?: number | null;
  error?: string | null;
  created: Date | null;
  updated: Date | null;
  deviceTokens: Array<DeviceTokenType> | null;
};
type DeviceTokenType = {
  _id: string;
  device: string;
  token: string;
  tokenDeathTime: number;
};

const initProfileState = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  publicCardPacksCount: null, // количество колод
  created: null,
  updated: null,
  isAdmin: null,
  verified: null, // подтвердил ли почту
  rememberMe: null,
  error: null,
  deviceTokens: null,
  token: null,
  tokenDeathTime: null,
  resetPasswordToken: null,
  resetPasswordTokenDeathTime: null,
  password: null,
};

export const ProfileReducer = (
  // eslint-disable-next-line
  state: ProfileStateType = initProfileState,
  action: ProfileActionTypes,
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE_CASE':
      return {
        ...state,
        ...action.data,
      };
    case LOG_OUT:
      return { ...initProfileState };
    case 'ADD-AVATAR':
      return { ...state, avatar: action.avatar };
    case 'CHANGE-USERNAME':
      return { ...state, name: action.userName };
    default:
      return state;
  }
};

export const profileAction = (param: {}) =>
  ({ type: 'PROFILE_CASE', data: param } as const);
export const changeUserNameAC = (userName: string) =>
  ({ type: 'CHANGE-USERNAME', userName } as const);
export const addAvatarAC = (avatar: string) => ({ type: 'ADD-AVATAR', avatar } as const);
export const addAvatarTC =
  (userName: string, avatarUrl: string) =>
  (
    dispatch: ThunkDispatch<void, AppRootStateType, AppActionTypes | ErrorActionTypes>,
  ) => {
    API.profile
      .updateAvatar(userName, avatarUrl)
      .then(() => {
        dispatch(authMeThunk());
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          dispatch(setError(true, err.response.data.error));
        }
        dispatch(setError(true, err.toJSON().message));
      });
  };
export const changeUserNameTC =
  (userName: string) =>
  (dispatch: ThunkDispatch<void, AppRootStateType, AppActionTypes>) => {
    dispatch(preloaderToggle(true));
    API.profile
      .updateUserName(userName)
      .then(() => {
        dispatch(authMeThunk());
        dispatch(preloaderToggle(false));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          dispatch(preloaderToggle(false));
        }
      });
  };

export const LogOutClearState = () => ({ type: LOG_OUT } as const);

export type AddAvatarType = ReturnType<typeof addAvatarAC>;
export type ProfileActionType = ReturnType<typeof profileAction>;
export type LogOutActionType = ReturnType<typeof LogOutClearState>;
export type ChangeUserNameType = ReturnType<typeof changeUserNameAC>;
type ProfileActionTypes =
  | ProfileActionType
  | LogOutActionType
  | AddAvatarType
  | ChangeUserNameType
  | AppActionTypes;
