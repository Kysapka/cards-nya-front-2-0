import axios, { AxiosResponse } from 'axios';
import { ProfileStateType } from 'n2-features/f0-test/Profile/Profile-Reducer';

import {
  ForgetPasswordResp,
  PostForgetPasswordReq,
} from '../../n2-features/f0-test/ForgetPassword/TypeForForgetPasswordResponse';
import {
  PostRecoveryPasswordReq,
  RecoveryPasswordResp,
} from '../../n2-features/f0-test/RecoveryPass/TypeRecoveryPasswordResponse';

import { axiosInst } from './apiConfig';
import {
  ApiResponseTypes,
  DeleteResponseType,
  UserDataResponseType,
} from './ApiResponseTypes';

export type LoginPostType = { email: string; password: string; rememberMe: boolean };
export const API = {
  profile: {
    updateAvatar: (userName: string, avatarUrl: string) =>
      axiosInst.put('/auth/me', { name: userName, avatar: avatarUrl }),
    updateUserName: (userName: string) =>
      axiosInst.put<string, AxiosResponse<ProfileStateType>>('/auth/me', {
        name: userName,
      }),
  },
  app: {
    getAuth: () =>
      axiosInst.post<null, ApiResponseTypes<UserDataResponseType>>('auth/me', {}),
  },
  login: {
    login: (params: LoginPostType) =>
      axiosInst.post<LoginPostType, AxiosResponse<ProfileStateType>>(
        'auth/login',
        params,
      ),
  },
  logout: {
    logout: () => axiosInst.delete<{}, AxiosResponse<DeleteResponseType>>('auth/me', {}),
  },
  forgetPassword: {
    forgetPassword: (email: string) =>
      axios.post<PostForgetPasswordReq, AxiosResponse<ForgetPasswordResp>>(
        'https://neko-back.herokuapp.com/2.0/auth/forgot',
        {
          email,
          from: 'test-front-admin <ai73a@yandex.by>',
          message:
            '\n<div style="background-color: lime; padding: 15px">\npassword recovery link: \n<a href=\'https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$\'>link</a>\n</div>\n',
        },
      ),
    changePasswordOnForget: (password: string, token: string) =>
      axiosInst.post<PostRecoveryPasswordReq, AxiosResponse<RecoveryPasswordResp>>(
        'auth/set-new-password',
        { resetPasswordToken: token, password },
      ),
  },
  registration: (email: string, password: string) =>
    axiosInst.post<
      { email: string; password: string },
      ApiResponseTypes<UserDataResponseType>
    >('auth/register', { email, password }),
};
