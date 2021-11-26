import axios from 'axios';
import { Dispatch } from 'redux';

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
  user_id?: string;
};

export const getCardPacksTC =
  (getPacksCommonRequestParams: getPacksCommonRequestParamsType) =>
  (dispatch: Dispatch) => {
    dispatch(SetDisabledPacksAC(true));
    // console.dir(getPacksCommonRequestParams);
    cardPacksAPI
      .getCardPacks({ ...getPacksCommonRequestParams })
      .then(res => {
        console.dir(res);
        dispatch(SetCardPacksAC(res.data));
        dispatch(SetDisabledPacksAC(false));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data.error);
          dispatch(SetDisabledPacksAC(false));
        }
      });
  };
