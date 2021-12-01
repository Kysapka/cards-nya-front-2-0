import { CardType } from '../../f1-table/cards/CardsReducer';

export type initPlayCardStateType = {
  cards: Array<CardType> | null;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
};
