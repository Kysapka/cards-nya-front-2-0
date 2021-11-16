import { Dispatch } from 'redux';

import { API } from '../m3-dal';

import { setAppInitializate, setAuth } from './app-reducer';

export const authMeThunk = () => (dispatch: Dispatch) => {
  API.app
    .getAuth()
    .then(res => {
      dispatch(setAuth(true));
      dispatch(setAppInitializate(true));
      console.log({ ...res });
    })
    .catch(err => {
      dispatch(setAuth(false));
      console.log({ ...err });
    });
};
