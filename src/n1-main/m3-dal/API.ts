import { axiosInst } from './apiConfig';
import { ApiResponseTypes } from './ApiResponseTypes';

export const API = {
  app: {
    fakeRequest: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  login: {
    login: (param: string) => axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  recoveryPassword: {
    recoveryPass: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
  registration: (email: string, password: string) =>
    axiosInst.post<string, ApiResponseTypes>('', { email, password }),
};
