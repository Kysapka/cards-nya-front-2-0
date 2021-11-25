import axios from 'axios';
import { Dispatch } from 'redux';

import { cardPacksAPI } from './CardsPackAPI';
import { SET_CARD_PACKS } from './consts';
import { CardInPackType, CardPacksType } from './types';

const initCardPacksState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      user_name: '',
      private: false,
      name: '',
      path: '',
      cardsCount: 0,
      grade: 0,
      shots: 0,
      rating: 0,
      type: '',
      created: '',
      updated: '',
      __v: 0,
    },
  ],
  token: '',
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  disabled: false,
};

export const CardPacksReducer = (
  state: CardPacksType = initCardPacksState,
  action: ActionTypes,
): CardPacksType => {
  switch (action.type) {
    case SET_CARD_PACKS:
    case 'SET-VALUE-CARDS-TYPE':
    case 'SET-PAGE':
    case 'SET-DISABLED': {
      return { ...state, ...action.payload };
    }
    case 'ADD-PACK': {
      return {
        ...state,
        cardPacks: [...state.cardPacks, { ...action.newCardsPack }],
      };
    }
    case 'DELETE-PACK': {
      return {
        ...state,
        cardPacks: state.cardPacks.filter(element => element._id !== action.id),
      };
    }
    default:
      return state;
  }
};

export const SetCardPacksAC = (payload: CardPacksType) =>
  ({ type: SET_CARD_PACKS, payload } as const);
export const SetPagePacksAC = (page: number) =>
  ({ type: 'SET-PAGE', payload: { page } } as const);
export const SetDisabledPacksAC = (disabled: boolean) =>
  ({ type: 'SET-DISABLED', payload: { disabled } } as const);

export const DeletPackAC = (id: string) => ({ type: 'DELETE-PACK', id } as const);
export const AddPackAC = (newCardsPack: CardInPackType) =>
  ({ type: 'ADD-PACK', newCardsPack } as const);

export const SetValueCardsCountPacksAC = (min: number, max: number) =>
  ({
    type: 'SET-VALUE-CARDS-TYPE',
    payload: { minCardsCount: min, maxCardsCount: max },
  } as const);

export type CardPacksActionTypes = ReturnType<typeof SetCardPacksAC>;
export type SetValueCardsCountPacksACType = ReturnType<typeof SetValueCardsCountPacksAC>;
export type SetPagePacksACType = ReturnType<typeof SetPagePacksAC>;
export type SetDisabledPacksACType = ReturnType<typeof SetDisabledPacksAC>;
export type DeletPackACType = ReturnType<typeof DeletPackAC>;
export type AddPackACType = ReturnType<typeof AddPackAC>;

export const DeletePackThunk = (id: string) => (dispatch: Dispatch) => {
  dispatch(SetDisabledPacksAC(true));
  cardPacksAPI
    .deleteCardsPacks(id)
    .then(resp => {
      dispatch(DeletPackAC(resp.data.deletedCardsPack._id));
      dispatch(SetDisabledPacksAC(false));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
        dispatch(SetDisabledPacksAC(false));
      }
    });
};

export const AddPackThunk = (name?: string) => (dispatch: Dispatch) => {
  dispatch(SetDisabledPacksAC(true));
  cardPacksAPI
    .createCardPack(name)
    .then(resp => {
      console.log(resp.data);
      dispatch(AddPackAC(resp.data.newCardsPack));
      dispatch(SetDisabledPacksAC(false));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.error);
        dispatch(SetDisabledPacksAC(false));
      }
    });
};

type ActionTypes =
  | CardPacksActionTypes
  | SetValueCardsCountPacksACType
  | SetPagePacksACType
  | SetDisabledPacksACType
  | DeletPackACType
  | AddPackACType;
