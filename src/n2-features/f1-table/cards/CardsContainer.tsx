import React from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PLAY_CARDS_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddCardModal } from './AddCardModal';
import { initCardsStateType } from './CardsReducer';
import { CardsTableModelCards } from './CardsTableModelCards';
import { TableCardCards } from './TableCardCards';

export const CardsContainer = (): React.ReactElement => {
  const data = useSelector<AppRootStateType, initCardsStateType>(state => state.cards);
  const loding = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickStartGame = (): void => {
    navigate(PLAY_CARDS_ROUTE);
  };
  return (
    <div>
      <AddCardModal />
      <Button onClick={onClickStartGame}>Play Game</Button>
      <TableCardCards
        loading={false}
        model={CardsTableModelCards()}
        data={data.cards}
        disabled={loding}
      />
    </div>
  );
};
