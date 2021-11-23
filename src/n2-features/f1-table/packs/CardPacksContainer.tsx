import React, { ChangeEvent, ReactElement, useEffect } from 'react';

import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { getCardPacksTC } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { SetValueCardsCountPacksAC } from './PacksReducer';
import { PaginationComponent } from './pagination/Pagination';
import { TableCardPacks } from './TableCardPacks';
import { CardPacksType } from './types';

export const CardPacksContainer = (): ReactElement => {
  const data = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCardPacksTC(data.minCardsCount, data.maxCardsCount, data.page));
  }, [data.page]);
  const Search = (): void => {
    dispatch(getCardPacksTC(data.minCardsCount, data.maxCardsCount, data.page));
  };
  const changeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.name === 'max') {
      const max = Number(event.currentTarget.value);
      dispatch(SetValueCardsCountPacksAC(data.minCardsCount, max));
    }
    if (event.currentTarget.name === 'min') {
      const min = Number(event.currentTarget.value);
      dispatch(SetValueCardsCountPacksAC(min, data.maxCardsCount));
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>RangeMin {data.minCardsCount}</Form.Label>
        <Form.Range value={data.minCardsCount} name="min" onChange={changeValue} />
        <Form.Label>RangeMax {data.maxCardsCount}</Form.Label>
        <Form.Range value={data.maxCardsCount} name="max" onChange={changeValue} />
        <Button onClick={Search}>search</Button>
      </Form.Group>
      <TableCardPacks
        model={CardTableModel()}
        data={data.cardPacks}
        disabled={data.disabled}
      />
      <PaginationComponent
        pageCardsTotal={20}
        totalCards={data.cardPacksTotalCount}
        activePage={data.page}
        disabled={data.disabled}
      />
    </div>
  );
};
