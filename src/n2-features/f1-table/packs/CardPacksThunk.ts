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

export const getCardPacksTC =
  (
    minCards: number,
    maxCards: number,
    page: number,
    packName?: string,
    userId?: string,
  ) =>
  (dispatch: Dispatch) => {
    dispatch(SetDisabledPacksAC(true));
    cardPacksAPI
      .getCardPacks(minCards, maxCards, page, userId, packName)
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
