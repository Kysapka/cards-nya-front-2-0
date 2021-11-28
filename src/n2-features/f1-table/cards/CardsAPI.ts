import { AxiosResponse } from 'axios';

import { axiosInst } from '../../../n1-main/m3-dal/apiConfig';

import { CardType } from './CardsReducer';

export const cardsAPI = {
  getCards: (id: string) =>
    axiosInst.get<any, AxiosResponse<ResponseCardsType>>('cards/card', {
      params: { cardsPack_id: id },
    }),
  addCards: (card: AddCard) => axiosInst.post('cards/card', { card }),
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
