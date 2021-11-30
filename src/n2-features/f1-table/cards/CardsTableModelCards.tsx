import React from 'react';

import { useDispatch } from 'react-redux';

import { CardType, ShowCardModalAC } from './CardsReducer';
import { ITableModel } from './TableCardCards';

export const CardsTableModelCards = (): ITableModel[] => {
  const dispatch = useDispatch();
  const onClickHandler = (): void => {
    dispatch(ShowCardModalAC(true));
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
