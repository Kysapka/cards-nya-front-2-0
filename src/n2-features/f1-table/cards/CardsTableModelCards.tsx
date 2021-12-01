import React from 'react';

import { useDispatch } from 'react-redux';

import { EditableSpan } from '../../f0-test/EditableSpan/EditableSpan';
import { ModalConfirm } from '../../f0-test/modalWindow/ModalConfirm/ModalConfirm';
import { ChangeModalShowStatusAC } from '../../f0-test/modalWindow/ModalConfirm/ModuleConfirmReducer';

import {
  CardType,
  DeleteCardThunk,
  ModalType,
  ShowCardModalAC,
  UpdateCardsThunk,
} from './CardsReducer';
import { ITableModel } from './TableCardCards';

export const CardsTableModelCards = (): ITableModel[] => {
  const dispatch = useDispatch();
  const onClickDeleteCardCallBack = (idCard: string): void => {
    dispatch(DeleteCardThunk(idCard));
  };
  const onClickHandlerCardType = (modalType: ModalType, cardsId?: string): void => {
    dispatch(ShowCardModalAC(true, modalType, cardsId));
  };
  const onUpdateCardQuestion = (id: string, question: string, answer: string): void => {
    dispatch(UpdateCardsThunk(id, question, answer));
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
          <EditableSpan
            name={d.question!}
            thunk={(title: string) =>
              onUpdateCardQuestion(d._id!, title, 'hello mutherasd')
            }
          />
        </div>
      ),
    },
    {
      title: (i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <b>Cards Answer</b>
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
            onClick={() => onClickHandlerCardType('Add Card')}
          >
            Add new cards
          </button>
        </div>
      ),
      render: (d: CardType, i: number) => (
        <div key={i} style={{ width: '60%' }}>
          <ModalConfirm title="Pack" callBack={() => onClickDeleteCardCallBack(d._id!)} />
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => dispatch(ChangeModalShowStatusAC(true))}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginLeft: '10px' }}
            onClick={() => onClickHandlerCardType('Update Card', d._id!)}
          >
            Update Card
          </button>
        </div>
      ),
    },
  ];
};
