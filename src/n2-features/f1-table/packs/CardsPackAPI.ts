import { axiosInst } from '../../../n1-main/m3-dal/apiConfig';
import { ApiResponseTypes } from '../../../n1-main/m3-dal/ApiResponseTypes';

import { CardPacksType } from './types';

export const cardPacksAPI = {
  getCardPacks: () => axiosInst.get<any, ApiResponseTypes<CardPacksType>>('cards/pack'),
};
