import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useRef } from 'react';

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
  const valueSearch = useRef<string>();
  const data = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getCardPacksTC(
        data.minCardsCount,
        data.maxCardsCount,
        data.page,
        valueSearch.current,
      ),
    );
  }, [data.page]);
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id);
  const Search = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.name === 'search') {
      dispatch(getCardPacksTC(data.minCardsCount, data.maxCardsCount, data.page));
    } else if (e.currentTarget.name === 'searchMyCards') {
      if (userId) {
        dispatch(
          getCardPacksTC(data.minCardsCount, data.maxCardsCount, data.page, '', userId),
        );
      }
    } else if (e.currentTarget.name === 'searchInputCardPack') {
      dispatch(
        getCardPacksTC(
          data.minCardsCount,
          data.maxCardsCount,
          data.page,
          valueSearch.current,
        ),
      );
    }
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
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    valueSearch.current = event.currentTarget.value;
  };

  return (
    <div>
      <Form.Group className="mb-3" style={{ width: '400px' }} controlId="formBasicEmail">
        <Form.Control
          onChange={onChangeHandler}
          type="email"
          placeholder="input Card Pack Name"
        />
        <Form.Text className="text-muted">Input name pack</Form.Text>
        <Button onClick={Search} name="searchInputCardPack">
          search
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Label>RangeMin {data.minCardsCount}</Form.Label>
        <Form.Range value={data.minCardsCount} name="min" onChange={changeValue} />
        <Form.Label>RangeMax {data.maxCardsCount}</Form.Label>
        <Form.Range value={data.maxCardsCount} name="max" onChange={changeValue} />
        <Button onClick={Search} name="search">
          search
        </Button>
        <Button onClick={Search} name="searchMyCards">
          search My Cards
        </Button>
      </Form.Group>
      <TableCardPacks
        model={CardTableModel()}
        data={data.cardPacks}
        disabled={data.disabled}
      />
      <PaginationComponent
        pageCardsTotal={10}
        totalCards={data.cardPacksTotalCount}
        activePage={data.page}
        disabled={data.disabled}
      />
    </div>
  );
};
