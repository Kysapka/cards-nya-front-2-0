import axios from 'axios';
import { Dispatch } from 'redux';

import { preloaderToggle, setAuth } from '../../../n1-main/m2-bll/app-reducer';
import { API } from '../../../n1-main/m3-dal';
import { ErrorResponseType } from '../../../n1-main/m3-dal/ApiResponseTypes';
import { LogOutClearState } from '../Profile/Profile-Reducer';

export const LogOut = () => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  API.logout
    .logout()
    .then(() => {
      dispatch(setAuth(false));
      dispatch(LogOutClearState());
      dispatch(preloaderToggle(false));
    })
    .catch((err: ErrorResponseType) => {
      if (axios.isAxiosError(err) && err.response) {
        dispatch(preloaderToggle(false));
      }
    });
};
