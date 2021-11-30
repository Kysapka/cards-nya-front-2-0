import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddCardModal } from './AddCardModal';
import { initCardsStateType } from './CardsReducer';
import { CardsTableModelCards } from './CardsTableModelCards';
import { TableCardCards } from './TableCardCards';

export const CardsContainer = (): React.ReactElement => {
  const data = useSelector<AppRootStateType, initCardsStateType>(state => state.cards);
  const loding = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const dispatch = useDispatch();

  return (
    <div>
      <AddCardModal />
      <TableCardCards
        loading={false}
        model={CardsTableModelCards()}
        data={data.cards}
        disabled={loding}
      />
    </div>
  );
};
