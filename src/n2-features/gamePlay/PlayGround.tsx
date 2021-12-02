import React, { FC, useEffect, useRef, useState } from 'react';

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
import { PlayCard } from './PlayCard';
import style from './playGround.module.scss';

export const PlayGround: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const { isAuth, isAppInitializated } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  useEffect(() => {
    if (isAuth) {
      if (param.idPack) {
        dispatch(SetPlayCardThunk(param.idPack, 1000));
      }
    }
  }, [isAuth]);
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
    <PlayCard
      card={card}
      callback={() => {
        if (param.idPack) {
          dispatch(SetPlayCardThunk(param.idPack, 1000));
        }
      }}
    />
  );
  return render;
};
