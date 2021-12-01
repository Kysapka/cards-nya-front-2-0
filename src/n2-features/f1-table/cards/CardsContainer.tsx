import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddAndUpdateCardModal } from './AddAndUpdateCardModal';
import { initCardsStateType } from './CardsReducer';
import { CardsTableModelCards } from './CardsTableModelCards';
import { TableCardCards } from './TableCardCards';

export const CardsContainer = (): React.ReactElement => {
  const data = useSelector<AppRootStateType, initCardsStateType>(state => state.cards);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

  return (
    <div>
      <AddAndUpdateCardModal />
      <TableCardCards
        loading={false}
        model={CardsTableModelCards()}
        data={data.cards}
        disabled={loading}
      />
    </div>
  );
};
