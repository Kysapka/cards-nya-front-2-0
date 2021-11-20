import { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { getCardPacksTC } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { TableCardPacks } from './TableCardPacks';
import { CardInPackType } from './types';

export const CardPacksContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const data = useSelector<AppRootStateType, CardInPackType[]>(
    state => state.cardPacks.cardPacks,
  );
  const getCardPacksHandler = (): void => {
    dispatch(getCardPacksTC());
  };

  return (
    <div>
      <button type="button" onClick={getCardPacksHandler}>
        GET CARD PACKS
      </button>
      <TableCardPacks model={CardTableModel()} data={data} />
    </div>
  );
};
