import { axiosInst } from '../../../n1-main/m3-dal/apiConfig';
import { ApiResponseTypes } from '../../../n1-main/m3-dal/ApiResponseTypes';

import { CardPacksType } from './types';

export const cardPacksAPI = {
  getCardPacks: (minCards: number, maxCards: number, page: number) =>
    axiosInst.get<any, ApiResponseTypes<CardPacksType>>('cards/pack', {
      params: {
        pageCount: 20,
        min: minCards,
        max: maxCards,
        page,
      },
    }),
  createCardPack: () =>
    axiosInst.post('cards/pack', {
      name: 'no Name',
      path: '/master',
      grade: 0,
      shots: 0,
      rating: 0,
      deckCover: 'url or base64',
      private: false,
      type: 'pack',
    }),
  deleteCardsPacks: (id: string) =>
    axiosInst.delete('cards/pack', {
      params: { id },
    }),
};
