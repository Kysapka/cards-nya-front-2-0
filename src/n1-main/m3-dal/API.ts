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
  registration: {
    registration: (param: string) =>
      axiosInst.post<string, ApiResponseTypes>('', { param }),
  },
};
