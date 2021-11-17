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
    default:
      return state;
  }
};

export const profileAction = (param: {}) =>
  ({ type: 'PROFILE_CASE', data: param } as const);

export const LogOutClearState = () => ({ type: LOG_OUT } as const);

export type ProfileActionType = ReturnType<typeof profileAction>;
export type LogOutActionType = ReturnType<typeof LogOutClearState>;
type ProfileActionTypes = ProfileActionType | LogOutActionType;
