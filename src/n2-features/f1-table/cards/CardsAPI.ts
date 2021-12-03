import { AxiosResponse } from 'axios';

import { axiosInst } from '../../../n1-main/m3-dal/apiConfig';

import { CardType } from './CardsReducer';

export const cardsAPI = {
  getCards: (id: string) =>
    axiosInst.get<string, AxiosResponse<ResponseCardsType>>('cards/card', {
      params: { cardsPack_id: id },
    }),
  addCards: (card: AddCard) =>
    axiosInst.post<AddCard, AxiosResponse<AddCardResponseType>>('cards/card', { card }),
  deleteCard: (idCard: string) =>
    axiosInst.delete<string, AxiosResponse<DeleteCard>>('cards/card', {
      params: { id: idCard },
    }),
  updateCard: (card: UpdateCardType) =>
    axiosInst.put<UpdateCardType, AxiosResponse<UpdatedCardType>>('cards/card', { card }),
  updateCardGrade: (card: UpdateCardGradeType) =>
    axiosInst.put<UpdateCardType, AxiosResponse<UpdatedCardType>>('cards/card', { card }),
  getAllCards: (id: string, pageCount: number) =>
    axiosInst.get<any, AxiosResponse<ResponseCardsType>>('cards/card', {
      params: { cardsPack_id: id, pageCount },
    }),
};

export type AddCardResponseType = {
  newCard: CardType;
  token: string;
  tokenDeathTime: number;
};

export type ResponseCardsType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
};

export type AddCard = {
  // eslint-disable-next-line camelcase
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  rating?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
  type?: string;
};
export type DeleteCard = {
  deletedCard: {
    answer: string;
    // eslint-disable-next-line camelcase
    cardsPack_id: string;
    comments: string;
    created: string;
    grade: number;
    // eslint-disable-next-line camelcase
    more_id: string;
    question: string;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    // eslint-disable-next-line camelcase
    user_id: string;
    __v: number;
    _id: string;
  };
  token: string;
  tokenDeathTime: number;
};
export type UpdatedCardType = {
  updatedCard: UpgradeCards;
  token: string;
  tokenDeathTime: number;
};
export type UpdateCardType = {
  _id: string;
  question: string;
  answer: string;
};
export type UpdateCardGradeType = {
  _id: string;
  grade: number;
};
export type UpgradeCards = {
  answer: string;
  answerImg: string;
  answerVideo: string;
  // eslint-disable-next-line camelcase
  cardsPack_id: string;
  comments: string;
  created: string;
  grade: number;
  // eslint-disable-next-line camelcase
  more_id: string;
  question: string;
  questionImg: string;
  questionVideo: string;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  // eslint-disable-next-line camelcase
  user_id: string;
  __v: number;
  _id: string;
};
