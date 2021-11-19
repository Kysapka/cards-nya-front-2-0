import { SET_CARD_PACKS } from './consts';
import { CardPacksType } from './types';

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
};

export const CardPacksReducer = (
  // eslint-disable-next-line
  state: CardPacksType = initCardPacksState,
  action: ActionTypes,
): CardPacksType => {
  switch (action.type) {
    case SET_CARD_PACKS: {
      return { ...state, ...action.payload, cardPacks: action.payload.cardPacks };
    }
    default:
      return state;
  }
};

export const SetCardPacksAC = (payload: CardPacksType) =>
  ({ type: SET_CARD_PACKS, payload } as const);

export type CardPacksActionTypes = ReturnType<typeof SetCardPacksAC>;
type ActionTypes = CardPacksActionTypes;
