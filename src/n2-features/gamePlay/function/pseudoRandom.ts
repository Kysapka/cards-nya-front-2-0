import { CardType } from '../../f1-table/cards/CardsReducer';

export function pseudoRandom(arr: Array<CardType> | null): CardType | null {
  if (!arr) {
    return null;
  }
  const RandomArr = arr.map(element => ({
    ...element,
    grade: (6 - element.grade!) ** 2,
  }));
  const result = RandomArr.reduce((acc, item) => item.grade + acc, 0);
  let i = 0;
  let sum = 0;
  const random = Math.floor(Math.random() * result);
  while (sum <= random) {
    sum += RandomArr[i].grade;
    i += 1;
  }
  return arr[i - 1];
}
