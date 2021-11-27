import React, { ChangeEvent, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { EditableSpan } from '../../f0-test/EditableSpan/EditableSpan';

import { AddPackThunk, ChangePackNameThunk, DeletePackThunk } from './PacksReducer';
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
  const onClickHandlerPackNameChange = (id: string, packName: string): void => {
    dispatch(ChangePackNameThunk(id, packName));
  };
  return [
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Card Packs</b>
        </div>
      ),

      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <EditableSpan
            name={d.name}
            thunk={(title: string) => onClickHandlerPackNameChange(d._id, title)}
          />
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Cards Count</b>
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
          <b>Update Card</b>
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
          <input
            className="shadow bg-gradient border-primary opacity-75 border-3"
            style={{ borderRadius: '5%', padding: '5px' }}
            onChange={ChangeHandler}
            type="text"
            placeholder="name"
          />
          {/* <input onChange={ChangeHandler} /> */}
          <button
            className="btn-sm btn btn-primary"
            style={{ marginLeft: '20px', borderRadius: '5%' }}
            onClick={onClickHandler}
          >
            Add new card
          </button>
        </div>
      ),
      render: (d: CardInPackType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <button
            className="btn-sm"
            onClick={() => {
              dispatch(DeletePackThunk(d._id));
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
};
