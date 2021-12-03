import axios from 'axios';
import { preloaderToggle } from 'n1-main/m2-bll/app-reducer';
import { setError } from 'n1-main/m2-bll/ErrorReducer';
import { UpdateGradeAC } from 'n2-features/f1-table/cards/CardsReducer';
import { Dispatch } from 'redux';

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
    case 'UPDATE-GRADE-CARD': {
      if (state.cards) {
        return {
          ...state,
          cards: state.cards.map(el =>
            el._id === action.card._id
              ? {
                  ...el,
                  grade: action.card.grade,
                }
              : el,
          ),
        };
      }
      return state;
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
export const UpgradeCardGradeThunk =
  (id: string, grade: number) => (dispatch: Dispatch) => {
    dispatch(preloaderToggle(true));
    const updateGradeCard = {
      _id: id,
      grade,
    };
    cardsAPI
      .updateCardGrade(updateGradeCard)
      .then(resp => {
        dispatch(UpdateGradeAC(resp.data.updatedCard));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data);
          dispatch(setError(true, err.response.data.error));
        }
      })
      .finally(() => {
        dispatch(preloaderToggle(false));
      });
  };

type setPlayCardStateACType = ReturnType<typeof setPlayCardStateAC>;
type UpdateGradeCardACType = ReturnType<typeof UpdateGradeAC>;
type PlayCardActionTypes = setPlayCardStateACType | UpdateGradeCardACType;
