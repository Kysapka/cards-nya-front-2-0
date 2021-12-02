import React, { FC, useEffect, useRef, useState } from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { CardType } from '../f1-table/cards/CardsReducer';

import style from './playGround.module.scss';

type propsCardPlayType = {
  card: CardType;
  callback: () => void;
};

export const PlayCard: FC<propsCardPlayType> = ({
  card,
  callback,
}): React.ReactElement => {
  const [flipCard, setFlipCard] = useState<boolean>(false);
  const navigate = useNavigate();
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
