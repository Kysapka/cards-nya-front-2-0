import React, { MouseEventHandler, ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import { SetFilterPacksAC } from './PacksReducer';

type SortButtonPropsType = {
  sortTypeUp: string;
  sortTypeDown: string;
};
export const SortButtons = ({
  sortTypeUp,
  sortTypeDown,
}: SortButtonPropsType): ReactElement => {
  const dispatch = useDispatch();
  const sortUpHandler = (event: React.MouseEvent<HTMLElement>): void => {
    switch (event.currentTarget.id) {
      case 'sortByCardsCountUp': {
        dispatch(SetFilterPacksAC('1cardsCount'));
        break;
      }
      case 'sortByNameUp': {
        dispatch(SetFilterPacksAC('0name'));
        break;
      }
      case 'sortByUpdatedUp': {
        dispatch(SetFilterPacksAC('1updated'));
        break;
      }
      default:
        break;
    }
  };

  const sortDownHandler = (event: React.MouseEvent<HTMLElement>): void => {
    switch (event.currentTarget.id) {
      case 'sortByCardsCountDown': {
        console.log('sortByCardsCountDown');
        dispatch(SetFilterPacksAC('0cardsCount'));
        break;
      }
      case 'sortByNameDown': {
        console.dir('sortByNameDown');
        dispatch(SetFilterPacksAC('1name'));
        break;
      }
      case 'sortByUpdatedDown': {
        dispatch(SetFilterPacksAC('0updated'));
        break;
      }
      default:
        break;
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
      }}
    >
      <button id={sortTypeUp} onClick={sortUpHandler} className="btn-sm bg-gradient">
        up
      </button>
      <button id={sortTypeDown} onClick={sortDownHandler} className="btn-sm bg-gradient">
        down
      </button>
    </div>
  );
};
