import { AxiosResponse } from 'axios';

import { axiosInst } from '../../../n1-main/m3-dal/apiConfig';
import { ApiResponseTypes } from '../../../n1-main/m3-dal/ApiResponseTypes';

import { getPacksCommonRequestParamsType } from './CardPacksThunk';
import { CardInPackType, CardPacksType } from './types';

const cardsPack: cardsPackType = {
  name: 'no Name',
  path: '/master',
  grade: 0,
  shots: 0,
  rating: 0,
  deckCover: 'url or base64',
  private: false,
  type: 'pack',
};

type cardsPackType = {
  name: string;
  path: string;
  grade: number;
  shots: number;
  rating: number;
  deckCover: string;
  private: boolean;
  type: string;
};

export const cardPacksAPI = {
  getCardPacks: (getPacksCommonRequestParams: getPacksCommonRequestParamsType) =>
    axiosInst.get<any, ApiResponseTypes<CardPacksType>>('cards/pack', {
      params: {
        ...getPacksCommonRequestParams,
      },
    }),
  createCardPack: (name?: string) => {
    if (name) {
      cardsPack.name = name;
    }
    return axiosInst.post<
      cardsPackType,
      AxiosResponse<{
        newCardsPack: CardInPackType;
        token: string;
        tokenDeathTime: number;
      }>
    >('cards/pack', {
      cardsPack,
    });
  },
  deleteCardsPacks: (id: string) =>
    axiosInst.delete('cards/pack', {
      params: { id },
    }),
};
