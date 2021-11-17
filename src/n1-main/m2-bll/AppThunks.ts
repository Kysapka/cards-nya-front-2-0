import { Dispatch } from 'redux';

import { profileAction } from '../../n2-features/f0-test/Profile/Profile-Reducer';
import { API } from '../m3-dal';
import { ErrorResponseType } from '../m3-dal/ApiResponseTypes';

import { preloaderToggle, setAppInitializate, setAuth } from './app-reducer';

export const authMeThunk = () => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  API.app
    .getAuth()
    .then(res => {
      dispatch(setAuth(true));
      dispatch(profileAction(res.data));
      dispatch(preloaderToggle(false));
      dispatch(setAppInitializate(true));
    })
    .catch((err: ErrorResponseType) => {
      console.dir('get Auth server error', err.response.data.error);
      dispatch(setAuth(false));
      dispatch(preloaderToggle(false));
      dispatch(setAppInitializate(true));
    });
};
