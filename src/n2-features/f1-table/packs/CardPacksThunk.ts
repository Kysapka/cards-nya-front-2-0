import { Dispatch } from 'redux';

import { cardPacksAPI } from './CardsPackAPI';
import { SetCardPacksAC } from './PacksReducer';

export const getCardPacksTC = () => (dispatch: Dispatch) => {
  cardPacksAPI
    .getCardPacks()
    .then(res => {
      console.dir(res);
      dispatch(SetCardPacksAC(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};
