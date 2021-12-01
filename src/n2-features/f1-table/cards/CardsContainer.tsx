import React, { useEffect } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Loader } from '../../../n1-main/m1-ui/common/Loader';
import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddAndUpdateCardModal } from './AddAndUpdateCardModal';
import { GetCardsThunk, initCardsStateType } from './CardsReducer';
import { CardsTableModelCards } from './CardsTableModelCards';
import { TableCardCards } from './TableCardCards';

export const CardsContainer = (): React.ReactElement => {
  const data = useSelector<AppRootStateType, initCardsStateType>(state => state.cards);
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const cardPackId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (cardPackId.packId) {
      dispatch(GetCardsThunk(cardPackId.packId));
    }
  }, []);
  const onClickStartGame = (): void => {
    navigate(`/playcard/${cardPackId.packId}`);
  };
  if (!data.cards) {
    return <Loader />;
  }
  return (
    <div>
      <Button disabled={data.cards?.length === 0 || false} onClick={onClickStartGame}>
        Play Game
      </Button>
      <AddAndUpdateCardModal />
      <TableCardCards
        loading={false}
        model={CardsTableModelCards()}
        data={data.cards}
        disabled={loading}
      />
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};
