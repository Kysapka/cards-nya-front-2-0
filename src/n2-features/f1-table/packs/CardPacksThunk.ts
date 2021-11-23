import { Dispatch } from 'redux';

import { cardPacksAPI } from './CardsPackAPI';
import { SetCardPacksAC, SetDisabledPacksAC } from './PacksReducer';

export const getCardPacksTC =
  (minCards: number, maxCards: number, page: number) => (dispatch: Dispatch) => {
    dispatch(SetDisabledPacksAC(true));
    cardPacksAPI
      .getCardPacks(minCards, maxCards, page)
      .then(res => {
        console.dir(res);
        dispatch(SetCardPacksAC(res.data));
        dispatch(SetDisabledPacksAC(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(SetDisabledPacksAC(false));
      });
  };
