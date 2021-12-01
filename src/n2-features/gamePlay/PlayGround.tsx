import React, { FC, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Loader } from '../../n1-main/m1-ui/common/Loader';
import { LOGIN_ROUTE } from '../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../n1-main/m2-bll';
import { initAppStateType } from '../../n1-main/m2-bll/app-reducer';
import { CardType } from '../f1-table/cards/CardsReducer';

import { SetPlayCardThunk } from './Bll/PlayCardReducer';
import { pseudoRandom } from './function/pseudoRandom';

export const PlayGround: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const { isAuth, isAppInitializated } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  useEffect(() => {
    if (param.idPack) {
      dispatch(SetPlayCardThunk(param.idPack, 1000));
    }
  }, []);
  const card = pseudoRandom(
    useSelector<AppRootStateType, Array<CardType> | null>(state => state.playCard.cards),
  );
  if (!card || !param.idPack) {
    return <Loader />;
  }

  if (!isAppInitializated) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} />;
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
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          if (param.idPack) {
            dispatch(SetPlayCardThunk(param.idPack, 1000));
          }
        }}
      >
        Next
      </Button>
    </div>
  );
  return render;
};
