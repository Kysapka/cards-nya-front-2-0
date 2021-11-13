import axios from 'axios';

import { ApiResponseTypes } from './ApiResponseTypes';

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': ''
//     }
// }

const instance = axios.create({
  baseURL: '',
  // ...settings
});

export const API = {
  appAPI: {
    fakeRequest: (param: string) =>
      instance.post<string, ApiResponseTypes>('', { param }),
  },
  loginAPI: {
    login: (param: string) => instance.post<string, ApiResponseTypes>('', { param }),
  },
  recoveryPasswordAPI: {
    recoveryPass: (param: string) =>
      instance.post<string, ApiResponseTypes>('', { param }),
  },
  registrationAPI: {
    registration: (param: string) =>
      instance.post<string, ApiResponseTypes>('', { param }),
  },
};
