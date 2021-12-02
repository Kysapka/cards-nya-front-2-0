import React, { FC, useEffect, useState } from 'react';

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
    if (param.idPack) {
      dispatch(SetPlayCardThunk(param.idPack, 1000));
    }
  }, []);

  const [flipCard, setFlipCard] = useState<boolean>(false);
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
    <div className={style.cardShowContainer}>
      <div className={style.flipBox}>
        <div
          className={
            flipCard ? `${style.cardFront} ${style.cardFrontFlip}` : style.cardFront
          }
        >
          <p className={style.titleQuestion}>{card.question}</p>

          <div className={style.ratingGradeWrap}>
            <span className={style.cardRating}>Rating Card : {card.rating}</span>
            <span className={style.cardGrade}>Grade Card : {card.grade}</span>
            <div className={style.ratingButContainer}>
              <button
                onClick={() => console.log(1)}
                type="button"
                className="btn btn-warning"
              >
                1
              </button>
              <button
                onClick={() => console.log(2)}
                type="button"
                className="btn btn-warning"
              >
                2
              </button>
              <button
                onClick={() => console.log(3)}
                type="button"
                className="btn btn-warning"
              >
                3
              </button>
              <button
                onClick={() => console.log(4)}
                type="button"
                className="btn btn-warning"
              >
                4
              </button>
              <button
                onClick={() => console.log(5)}
                type="button"
                className="btn btn-warning"
              >
                5
              </button>
            </div>
          </div>

          <div className={style.butContainer}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Exit game
            </Button>

            <button
              onClick={() => setFlipCard(true)}
              type="button"
              className="btn btn-warning"
            >
              Show Answer
            </button>
            <Button
              variant="secondary"
              onClick={() => {
                if (param.idPack) {
                  dispatch(SetPlayCardThunk(param.idPack, 1000));
                }
              }}
            >
              Next Card
            </Button>
          </div>
        </div>
        <div
          className={
            flipCard ? style.cardBack : `${style.cardBack} ${style.cardBackFlip}`
          }
        >
          <h2>{card.answer}</h2>
          <button
            onClick={() => setFlipCard(false)}
            type="button"
            className="btn btn-warning"
          >
            Back to the question
          </button>
        </div>
      </div>
    </div>
  );
  return render;
};
