import { axiosInst } from './apiConfig';
import { ApiResponseTypes, RegistrationResponseType } from './ApiResponseTypes';

export type LoginPost = { email: string; password: string; rememberMe: boolean };
export const API = {
  app: {
    fakeRequest: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  login: {
    login: (params: LoginPost) =>
      axiosInst.post<string, ApiResponseTypes>('auth/login', params),
  },
  recoveryPassword: {
    recoveryPass: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  registration: (email: string, password: string) =>
    axiosInst.post<{ email: string; password: string }, RegistrationResponseType>(
      'auth/register',
      { email, password },
    ),
};
