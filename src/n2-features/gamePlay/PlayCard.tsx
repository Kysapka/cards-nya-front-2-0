import React, { FC, useState } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CardType } from '../f1-table/cards/CardsReducer';

import { UpgradeCardGradeThunk } from './Bll/PlayCardReducer';
import { GradeButton } from './GradeButton';
import style from './playGround.module.scss';

type propsCardPlayType = {
  card: CardType;
  callback: () => void;
};

export const PlayCard: FC<propsCardPlayType> = ({
  card,
  callback,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [flipCard, setFlipCard] = useState<boolean>(false);
  const navigate = useNavigate();
  const onHandlerGradeUpdate = (id: string, grade: number): void => {
    dispatch(UpgradeCardGradeThunk(id, grade));
  };
  return (
    <div className={style.cardShowContainer}>
      <div className={style.flipBox}>
        <div
          className={
            flipCard ? `${style.cardFront} ${style.cardFrontFlip}` : style.cardFront
          }
        >
          <p className={style.titleQuestion}>{card.question}</p>

          <div className={style.ratingGradeWrap}>
            <span className={style.cardGrade}>Grade Card : {card.grade}</span>
            <div className={style.ratingButContainer}>
              <GradeButton
                gradeName="1"
                gradeNumber={1}
                callBack={grade => onHandlerGradeUpdate(card._id!, grade)}
              />
              <GradeButton
                gradeName="2"
                gradeNumber={2}
                callBack={grade => onHandlerGradeUpdate(card._id!, grade)}
              />
              <GradeButton
                gradeName="3"
                gradeNumber={3}
                callBack={grade => onHandlerGradeUpdate(card._id!, grade)}
              />
              <GradeButton
                gradeName="4"
                gradeNumber={4}
                callBack={grade => onHandlerGradeUpdate(card._id!, grade)}
              />
              <GradeButton
                gradeName="5"
                gradeNumber={5}
                callBack={grade => onHandlerGradeUpdate(card._id!, grade)}
              />
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
                callback();
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
};
