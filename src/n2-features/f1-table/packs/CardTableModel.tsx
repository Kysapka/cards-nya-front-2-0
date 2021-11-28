import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';
import { EditableSpan } from '../../f0-test/EditableSpan/EditableSpan';
import { ModalConfirm } from '../../f0-test/modalWindow/ModalConfirm/ModalConfirm';
import { ChangeModalShowStatusAC } from '../../f0-test/modalWindow/ModalConfirm/ModuleConfirmReducer';

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
  const onClickHandlerDeletePack = (): void => {
    dispatch(ChangeModalShowStatusAC(true));
  };
  const callBackForDeletePackThunk = (id: string): void => {
    dispatch(DeletePackThunk(id));
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
          {/* {confirmModalStateAgree ? dispatch(DeletePackThunk(d._id)) : undefined} */}
          <ModalConfirm callBack={() => callBackForDeletePackThunk(d._id)} />
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
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              onClickHandlerDeletePack();
            }}
          >
            Delete
          </button>

          <button
            style={{ marginLeft: '10px' }}
            type="button"
            className="btn btn-outline-primary"
          >
            View Cards
          </button>
        </div>
      ),
    },
  ];
};
