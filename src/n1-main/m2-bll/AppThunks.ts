import axios from 'axios';
import { Dispatch } from 'redux';

import { profileAction } from '../../n2-features/f0-test/Profile/Profile-Reducer';
import { API } from '../m3-dal';

import { preloaderToggle, setAppInitializate, setAuth } from './app-reducer';

export const authMeThunk = () => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  API.app
    .getAuth()
    .then(res => {
      dispatch(profileAction(res.data));
      dispatch(preloaderToggle(false));
      dispatch(setAppInitializate(true));
      dispatch(setAuth(true));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(setAuth(false));
        dispatch(preloaderToggle(false));
        dispatch(setAppInitializate(true));
      }
    });
};
