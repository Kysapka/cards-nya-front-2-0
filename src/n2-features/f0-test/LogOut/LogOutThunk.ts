import { Dispatch } from 'redux';

import { preloaderToggle, setAuth } from '../../../n1-main/m2-bll/app-reducer';
import { API } from '../../../n1-main/m3-dal';
import { ErrorResponseType } from '../../../n1-main/m3-dal/ApiResponseTypes';
import { LogOutClearState } from '../Profile/Profile-Reducer';

export const LogOut = () => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  API.logout
    .logout()
    .then(res => {
      console.dir(res);
      dispatch(setAuth(false));
      dispatch(LogOutClearState());
      dispatch(preloaderToggle(false));
    })
    .catch((err: ErrorResponseType) => {
      console.dir('get Auth server error', err.response.data.error);
      dispatch(preloaderToggle(false));
    });
};
