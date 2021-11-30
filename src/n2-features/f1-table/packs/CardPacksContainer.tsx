import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initAppStateType } from '../../../n1-main/m2-bll/app-reducer';

import { getCardPacksTC } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { SetCardPacksAC, SetFilterPacksAC } from './PacksReducer';
import { PaginationComponent } from './pagination/Pagination';
import { useRangeDebounce } from './RangeDebaunceHook';
import { useSearchDebounce } from './SearchDebaunceHook';
import { TableCardPacks } from './TableCardPacks';
import { CardPacksType } from './types';

export const CardPacksContainer = (): ReactElement => {
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id);
  const {
    cardPacks,
    pageCount,
    cardPacksTotalCount,
    maxCardsCount,
    minCardsCount,
    page,
    disabled,
    filter,
  } = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const { isLoading, isAuth } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  const dispatch = useDispatch();
  const [searchedMinValue, setSearchedMinValue] = useState<number>(minCardsCount!);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(maxCardsCount!);
  const [search, setSearch] = useState<string>('');
  const [userID, setUserID] = useState<string | null>(null);

  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  const onlyMeSearchHandler = (checked: boolean): void => {
    if (checked) {
      setUserID(userId);
    } else {
      setUserID(null);
    }
  };

  const setCurrentPageHandler = (value: number): void => {
    dispatch(SetCardPacksAC({ page: value }));
  };
  const setSortFilterHandler = (value: string): void => {
    dispatch(SetFilterPacksAC('0cardsCount'));
  };

  const pageCountHandler = (value: number): void => {
    dispatch(SetCardPacksAC({ pageCount: value }));
    // setPageCount(+value);
  };

  const changeRangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.name === 'max') {
      const max = Number(event.currentTarget.value);
      setSearchedMaxValue(max);
    }
    if (event.currentTarget.name === 'min') {
      const min = Number(event.currentTarget.value);
      setSearchedMinValue(min);
    }
  };

  const debauncedMinRangeValue = useRangeDebounce(searchedMinValue, 2000);
  const debauncedMaxRangeValue = useRangeDebounce(searchedMaxValue, 2000);

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const debaunceSearch = useSearchDebounce(search, 3000);

  useEffect(() => {
    dispatch(
      getCardPacksTC({
        user_id: userID,
        packName: debaunceSearch,
        pageCount,
        page,
        min: debauncedMinRangeValue,
        max: debauncedMaxRangeValue,
        sortPacks: filter,
      }),
    );
  }, [
    pageCount,
    page,
    debauncedMinRangeValue,
    debauncedMaxRangeValue,
    debaunceSearch,
    userID,
    filter,
  ]);

  return (
    <div className="col-6 align-content-center m-lg-auto">
      <Form.Group
        className="mb-3"
        style={{ width: '400px', marginTop: '40px' }}
        controlId="PacksCardTable"
      >
        <Form.Control
          onChange={onSearchChangeHandler}
          type="text"
          placeholder="Enter card pack name for search..."
        />
        <div
          style={{
            marginTop: '20px',
            width: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="form-check form-switch" style={{ marginTop: '20px' }}>
            <label
              className="form-check-label text-capitalize bg-gradient bg-info"
              htmlFor="searchOnlyMePacks"
            >
              Search only me packs
            </label>
            <input
              onChange={e => onlyMeSearchHandler(e.currentTarget.checked)}
              className="form-check-input"
              type="checkbox"
              checked={!!userID}
              id="searchOnlyMePacks"
            />
          </div>
          <div>
            <select
              value={pageCount}
              onChange={e => pageCountHandler(+e.currentTarget.value)}
              style={{ width: '240px' }}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
            <label
              className="form-check-label text-capitalize bg-gradient bg-info"
              htmlFor="searchOnlyMePacks"
            >
              Select count of packs on page
            </label>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>RangeMin {searchedMinValue} </Form.Label>
        <Form.Range value={searchedMinValue} name="min" onChange={changeRangeValue} />
        <Form.Label>RangeMax {searchedMaxValue}</Form.Label>
        <Form.Range value={searchedMaxValue} name="max" onChange={changeRangeValue} />
      </Form.Group>
      <TableCardPacks
        model={CardTableModel()}
        data={cardPacks}
        disabled={disabled!}
        // loading={isLoading}
      />
      <PaginationComponent
        pageCardsTotal={pageCount!}
        totalCards={cardPacksTotalCount!}
        activePage={page!}
        disabled={disabled!}
        callback={setCurrentPageHandler}
      />
    </div>
  );
};
