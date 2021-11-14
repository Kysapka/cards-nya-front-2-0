import axios from 'axios';

import { axiosInst } from './apiConfig';
import { ApiResponseTypes, RegistrationResponseType } from './ApiResponseTypes';

export const API = {
  app: {
    fakeRequest: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  login: {
    login: (param: string) => axiosInst.post<string>('', { param }),
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
