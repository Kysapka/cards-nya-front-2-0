import { ChangeEvent, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { AddPackThunk, DeletePackThunk } from './PacksReducer';
import { ITableModel } from './TableCardPacks';
import { CardInPackType } from './types';

export const CardTableModel = (): ITableModel[] => {
  const dispatch = useDispatch();
  const searchValue = useRef<string>();
  const ChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    searchValue.current = event.currentTarget.value;
  };
  const onClickHandler = (): void => {
    dispatch(AddPackThunk(searchValue.current));
  };
  return [
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          CardPacks
        </div>
      ),

      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.name}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          CardsCount
        </div>
      ),
      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.cardsCount}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          UpdatedCard
        </div>
      ),
      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.updated}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          settings
          <input onChange={ChangeHandler} />
          <button onClick={onClickHandler}>Add</button>
        </div>
      ),
      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <button
            onClick={() => {
              dispatch(DeletePackThunk(d._id));
            }}
          >
            Delate
          </button>
          <button>Update</button>
        </div>
      ),
    },
  ];
};
