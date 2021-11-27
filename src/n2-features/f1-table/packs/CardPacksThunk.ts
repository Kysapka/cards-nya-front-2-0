import axios from 'axios';
import { Dispatch } from 'redux';

import { preloaderToggle, setAuth } from '../../../n1-main/m2-bll/app-reducer';

import { cardPacksAPI } from './CardsPackAPI';
import { SetCardPacksAC, SetDisabledPacksAC } from './PacksReducer';

// type ParamThunkType = {
//   minCards: number,
//   maxCards: number,
//   page: number,
//   packName?: string,
//   userId?: string,
// }

export type getPacksCommonRequestParamsType = {
  packName?: string | undefined;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  // eslint-disable-next-line camelcase
  user_id?: string | null;
};

export const getCardPacksTC =
  (getPacksCommonRequestParams: getPacksCommonRequestParamsType) =>
  (dispatch: Dispatch) => {
    dispatch(preloaderToggle(true));
    dispatch(SetDisabledPacksAC(true));
    cardPacksAPI
      .getCardPacks(getPacksCommonRequestParams)
      .then(res => {
        dispatch(SetCardPacksAC(res.data));
        dispatch(SetDisabledPacksAC(false));
        dispatch(preloaderToggle(false));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data.error);
          dispatch(setAuth(false));
          dispatch(SetDisabledPacksAC(false));
        }
      });
  };
