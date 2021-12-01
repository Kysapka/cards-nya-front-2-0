import React, { FC, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../n1-main/m1-ui/common/Loader';
import { AppRootStateType } from '../../n1-main/m2-bll';
import { CardType, initCardsStateType } from '../f1-table/cards/CardsReducer';

import { SetPlayCardThunk } from './Bll/PlayCardReducer';
import { pseudoRandom } from './function/pseudoRandom';

export const PlayGround: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const { _idPackCards, cardsTotalCount } = useSelector<
    AppRootStateType,
    initCardsStateType
  >(state => state.cards);
  useEffect(() => {
    dispatch(SetPlayCardThunk(_idPackCards!, cardsTotalCount!));
  }, []);
  const card = pseudoRandom(
    useSelector<AppRootStateType, Array<CardType> | null>(state => state.playCard.cards),
  );
  if (!card) {
    return <Loader />;
  }
  const render = loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{card.question}</h1>
      <h2>{card.answer}</h2>
      <div>
        <span>raiting : {card.rating}</span>
      </div>
      <div>
        <span>grade : {card.grade}</span>
      </div>
      <div>оценочка так сказать</div>
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          dispatch(SetPlayCardThunk(_idPackCards!, cardsTotalCount!));
        }}
      >
        Next
      </Button>
    </div>
  );
  return render;
};
