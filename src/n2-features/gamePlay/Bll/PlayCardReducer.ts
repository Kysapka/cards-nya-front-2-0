import axios from 'axios';
import { Dispatch } from 'redux';

import { preloaderToggle } from '../../../n1-main/m2-bll/app-reducer';
import { cardsAPI } from '../../f1-table/cards/CardsAPI';

import { initPlayCardStateType } from './types';

const initPlayCardState = {
  cards: null,
  cardsTotalCount: 60,
  maxGrade: 6,
  minGrade: 0,
};

export const PlayCardReducer = (
  // eslint-disable-next-line
  state: initPlayCardStateType = initPlayCardState,
  action: PlayCardActionTypes,
): initPlayCardStateType => {
  switch (action.type) {
    case 'SET-PLAY-CARD': {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
};

export const setPlayCardStateAC = (data: initPlayCardStateType) =>
  ({
    type: 'SET-PLAY-CARD',
    data,
  } as const);
export const SetPlayCardThunk =
  (id: string, pageCount: number) => (dispatch: Dispatch) => {
    dispatch(preloaderToggle(true));
    cardsAPI
      .getAllCards(id, pageCount)
      .then(resp => {
        const data = {
          cards: resp.data.cards,
          cardsTotalCount: resp.data.cardsTotalCount,
          maxGrade: resp.data.maxGrade,
          minGrade: resp.data.minGrade,
        };
        dispatch(setPlayCardStateAC(data));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err);
        }
      })
      .finally(() => {
        dispatch(preloaderToggle(false));
      });
  };
type setPlayCardStateACType = ReturnType<typeof setPlayCardStateAC>;
type PlayCardActionTypes = setPlayCardStateACType;
