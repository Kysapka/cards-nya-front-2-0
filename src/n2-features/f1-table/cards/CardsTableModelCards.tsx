import React, { ChangeEvent, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { AddCardsThunk, CardType } from './CardsReducer';
import { ITableModel } from './TableCardCards';

export const CardsTableModelCards = (): ITableModel[] => {
  const dispatch = useDispatch();
  const packId = useSelector<AppRootStateType, string | null>(
    state => state.cards._idPackCards,
  );
  const searchValue = useRef<string>();
  const ChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    searchValue.current = event.currentTarget.value;
  };
  const onClickHandler = (): void => {
    if (packId) {
      dispatch(AddCardsThunk(packId));
    }
  };
  return [
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Cards question</b>
        </div>
      ),

      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.question}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Cards Anwanser</b>
        </div>
      ),
      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.answer}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Update Cards</b>
        </div>
      ),
      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.updated}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Grade</b>
        </div>
      ),
      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          {d.grade}
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <input
            className="shadow bg-gradient border-primary opacity-75 border-3"
            style={{ borderRadius: '5%', padding: '5px' }}
            onChange={ChangeHandler}
            type="text"
            placeholder="name"
          />
          <button
            className="btn-sm btn btn-primary"
            style={{ marginLeft: '20px', borderRadius: '5%' }}
            onClick={onClickHandler}
          >
            Add new cards
          </button>
        </div>
      ),
      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <button className="btn-sm" onClick={() => {}}>
            Delete
          </button>
          <button className="btn-sm" style={{ marginLeft: '10px' }}>
            Update
          </button>
        </div>
      ),
    },
  ];
};
