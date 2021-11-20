export type CardInPackType = Array<{
  _id: string;
  // eslint-disable-next-line camelcase
  user_id: string;
  // eslint-disable-next-line camelcase
  user_name: string;
  name: string;
  path: string;
  cardsCount: number;
  grade: number;
  shots: number;
  rating: number;
  type: string;
  created: string;
  updated: string;
  __v: number;
  private: boolean;
}>;
export type CardPacksType = {
  cardPacks: CardInPackType;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: string;
};
