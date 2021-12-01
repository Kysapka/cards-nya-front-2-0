import axios from 'axios';
import { Dispatch } from 'redux';

import { preloaderToggle } from '../../../n1-main/m2-bll/app-reducer';

import { cardsAPI, UpdateCardType } from './CardsAPI';

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
  modalType: '',
  cardsId: null,
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
  modalType?: ModalType;
  // eslint-disable-next-line camelcase
  cardsId?: string | null;
};

export type ModalType = 'Add Card' | 'Update Card' | '';
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
    case 'DELETE-CARD':
      return {
        ...state,
        cards: state.cards!.filter(element => element._id !== action.id),
      };
    case 'UPDATE-CARDS': {
      return {
        ...state,
        cards: state.cards.map(el =>
          el._id === action.updateCard._id
            ? {
                ...el,
                question: action.updateCard.question,
                answer: action.updateCard.answer,
              }
            : el,
        ),
      };
    }
    default:
      return state;
  }
};

export const ShowCardModalAC = (add: boolean, modalType: ModalType, cardsId?: string) =>
  ({
    type: 'SHOW-CARD-MODAL',
    payload: { add, modalType, cardsId },
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
const UpdateCardsAC = (updateCard: UpdateCardType) =>
  ({
    type: 'UPDATE-CARDS',
    updateCard,
  } as const);
export const DeleteCardAC = (id: string) => ({ type: 'DELETE-CARD', id } as const);

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
export const UpdateCardsThunk =
  (id: string, question: string, answer: string) => (dispatch: Dispatch) => {
    dispatch(preloaderToggle(true));
    const card = {
      _id: id,
      question,
      answer,
    };
    cardsAPI
      .updateCard(card)
      .then(resp => {
        dispatch(UpdateCardsAC(resp.data.updatedCard));
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
export const DeleteCardThunk = (id: string) => (dispatch: Dispatch) => {
  dispatch(preloaderToggle(true));
  cardsAPI
    .deleteCard(id)
    .then(resp => {
      dispatch(DeleteCardAC(resp.data.deletedCard._id));
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
type DeleteCardACType = ReturnType<typeof DeleteCardAC>;
type UpdateCardACType = ReturnType<typeof UpdateCardsAC>;

type ActionTypes =
  | SetCardsACType
  | AddShowCardModalACType
  | AddCardsACType
  | DeleteCardACType
  | UpdateCardACType;
