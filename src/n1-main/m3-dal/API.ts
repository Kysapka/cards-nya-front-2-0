import axios, { AxiosResponse } from 'axios';

import { ProfileStateType } from '../../n2-features/f0-test/Profile/Profile-Reducer';

import { axiosInst } from './apiConfig';
import { ApiResponseTypes, RegistrationResponseType } from './ApiResponseTypes';

export type LoginPostType = { email: string; password: string; rememberMe: boolean };
export const API = {
  app: {
    getAuth: () => axiosInst.post<null, ApiResponseTypes>('auth/me', {}),
  },
  login: {
    login: (params: LoginPostType) =>
      axiosInst.post<LoginPostType, AxiosResponse<ProfileStateType>>(
        'auth/login',
        params,
      ),
  },
  forgetPassword: {
    forgetPassword: (email: string) =>
      axios.post<string>('https://neko-back.herokuapp.com/2.0/auth/forgot', {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message:
          '\n<div style="background-color: lime; padding: 15px">\npassword recovery link: \n<a href=\'http://localhost:3000/#/set-new-password/$token$\'>link</a>\n</div>\n',
      }),
    changePasswordOnForget: (password: string, token: string) =>
      axiosInst.post('auth/set-new-password', { resetPasswordToken: token, password }),
  },
  registration: (email: string, password: string) =>
    axiosInst.post<{ email: string; password: string }, RegistrationResponseType>(
      'auth/register',
      { email, password },
    ),
};
