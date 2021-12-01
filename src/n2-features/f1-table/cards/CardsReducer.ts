import axios from 'axios';
import { Dispatch } from 'redux';

import { preloaderToggle } from '../../../n1-main/m2-bll/app-reducer';
import { setPlayCardStateAC } from '../../gamePlay/Bll/PlayCardReducer';

import { cardsAPI } from './CardsAPI';

export const initCardsState: initCardsStateType = {
  cards: [
    {
      answer: 'aaaaa',
      // eslint-disable-next-line camelcase
      cardsPack_id: 'aaaaa',
      comments: 'aaaaa',
      created: 'aaaaa',
      grade: 5,
      // eslint-disable-next-line camelcase
      more_id: 'aaaaa',
      question: 'aaaaa',
      rating: 3,
      shots: 3,
      type: 'aaaaa',
      updated: 'aaaaa',
      // eslint-disable-next-line camelcase
      user_id: 'aaaaa',
      __v: 88,
      _id: 'aaaaa',
    },
  ],
  cardsTotalCount: null,
  maxGrade: null,
  minGrade: null,
  packUserId: null,
  page: null,
  pageCount: null,
  token: null,
  tokenDeathTime: null,
  _idPackCards: null,
  add: false,
};
export type initCardsStateType = {
  cards: Array<CardType>;
  cardsTotalCount: number | null;
  maxGrade: number | null;
  minGrade: number | null;
  packUserId: string | null;
  page: number | null;
  pageCount: number | null;
  token: string | null;
  tokenDeathTime: number | null;
  _idPackCards: string | null;
  add?: boolean;
};

export type CardType = {
  answer: string | null;
  // eslint-disable-next-line camelcase
  cardsPack_id: string | null;
  comments: string | null;
  created: string | null;
  grade: number | null;
  // eslint-disable-next-line camelcase
  more_id: string | null;
  question: string | null;
  rating: number | null;
  shots: number | null;
  type: string | null;
  updated: string | null;
  // eslint-disable-next-line camelcase
  user_id: string | null;
  __v: number | null;
  _id: string | null;
};
export const CardsReducer = (
  state: initCardsStateType = initCardsState,
  action: ActionTypes,
): initCardsStateType => {
  switch (action.type) {
    case 'SET-CARDS': {
      return { ...state, ...action.data };
    }
    case 'SHOW-CARD-MODAL': {
      return { ...state, ...action.payload };
    }
    case 'ADD-CARDS': {
      return { ...state, cards: [...state.cards, action.newCard] };
    }
    default:
      return state;
  }
};

export const ShowCardModalAC = (add: boolean) =>
  ({
    type: 'SHOW-CARD-MODAL',
    payload: { add },
  } as const);
const SetCardsAC = (data: initCardsStateType) =>
  ({
    type: 'SET-CARDS',
    data,
  } as const);

const AddCardsAC = (newCard: CardType) =>
  ({
    type: 'ADD-CARDS',
    newCard,
  } as const);

export const GetCardsThunk = (id: string) => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  cardsAPI
    .getCards(id)
    .then(resp => {
      const data = { ...resp.data, _idPackCards: id };
      dispatch(SetCardsAC(data));
    })
    .catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      }
    })
    .finally(() => {
      dispatch(preloaderToggle(false));
    });
};

export const AddCardsThunk =
  (id: string, answer: string, question: string) => (dispatch: Dispatch) => {
    dispatch(preloaderToggle(true));
    const card = {
      cardsPack_id: id,
      answer,
      question,
    };
    cardsAPI
      .addCards(card)
      .then(resp => {
        dispatch(AddCardsAC(resp.data.newCard));
      })
      .catch(err => {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data);
        }
      })
      .finally(() => {
        dispatch(preloaderToggle(false));
      });
  };

export type AddShowCardModalACType = ReturnType<typeof ShowCardModalAC>;
type SetCardsACType = ReturnType<typeof SetCardsAC>;
type AddCardsACType = ReturnType<typeof AddCardsAC>;

type ActionTypes = SetCardsACType | AddShowCardModalACType | AddCardsACType;
