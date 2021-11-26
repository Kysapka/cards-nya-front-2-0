import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';

import { getCardPacksTC, getPacksCommonRequestParamsType } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { usePacksRequestSettings } from './CustomRequestSettingsHook';
import { useDebounce } from './CustomUseDebaunceHook';
import { PaginationComponent } from './pagination/Pagination';
import { TableCardPacks } from './TableCardPacks';
import { CardPacksType } from './types';

export const CardPacksContainer = (): ReactElement => {
  const userId = useSelector<AppRootStateType, string | undefined>(
    state => state.profile._id,
  );
  const data = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
  const dispatch = useDispatch();

  const {
    searchedPackNameValue,
    searchedMinValue,
    searchedMaxValue,
    currentPage,
    pageCount,
    onlyMe,
    sortFilter,
    setSearchedPackNameValue,
    setSearchedMinValue,
    setSearchedMaxValue,
    setCurrentPage,
    setPageCount,
    setOnlyMe,
    setSortFilter,
  } = usePacksRequestSettings();

  const [searchCommonRequestPack, setSearchCommonRequestPack] =
    useState<getPacksCommonRequestParamsType>({});
  const debouncedSearchTerm = useDebounce(searchCommonRequestPack, 1000);

  useEffect(() => {
    setSearchCommonRequestPack({
      packName: searchedPackNameValue,
      min: searchedMinValue,
      max: searchedMaxValue,
      sortPacks: sortFilter,
      page: currentPage,
      pageCount,
    });
  }, [searchedPackNameValue, searchedMinValue, searchedMaxValue, pageCount, sortFilter]);
  useEffect(() => {
    if (currentPage !== 0) {
      dispatch(getCardPacksTC({ ...searchCommonRequestPack, page: currentPage }));
    }
  }, [currentPage]);

  const onlyMeSearchHandler = (checked: boolean): void => {
    if (checked) {
      setOnlyMe(true);
      dispatch(getCardPacksTC({ user_id: userId }));
    } else {
      setOnlyMe(false);
      dispatch(getCardPacksTC({ ...searchCommonRequestPack }));
    }
  };

  const setSortFilterHandler = (value: string): void => {
    setSortFilter(value);
  };

  const pageCountHandler = (value: string): void => {
    setPageCount(+value);
  };
  useEffect(() => {
    // Убедиться что у нас есть значение (пользователь ввел что-то)
    if (debouncedSearchTerm) {
      // Сделать запрос к АПИ
      if (Object.keys(searchCommonRequestPack).length !== 0) {
        setOnlyMe(false);
        dispatch(getCardPacksTC(debouncedSearchTerm));
      }
    }
  }, [debouncedSearchTerm]);

  const changeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.name === 'max') {
      const max = Number(event.currentTarget.value);
      setSearchedMaxValue(max);
    }
    if (event.currentTarget.name === 'min') {
      const min = Number(event.currentTarget.value);
      setSearchedMinValue(min);
    }
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchedPackNameValue(event.currentTarget.value);
  };
  if (!isAuth) {
    return <Navigate to={LOGIN_ROUTE} />;
  }
  return (
    <div className="col-9 align-content-center m-lg-auto">
      <Form.Group
        className="mb-3"
        style={{ width: '400px', marginTop: '40px' }}
        controlId="PacksCardTable"
      >
        <Form.Control
          onChange={onChangeHandler}
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
              checked={onlyMe}
              id="searchOnlyMePacks"
            />
          </div>
          <div>
            <select
              onChange={e => setSortFilterHandler(e.currentTarget.value)}
              style={{ width: '240px' }}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option defaultChecked={sortFilter === '0packName'} value="0packName">
                sort by name
              </option>
              <option defaultChecked={sortFilter === '0cardsCount'} value="0cardsCount">
                sort by cards count
              </option>
              <option defaultChecked={sortFilter === '0updated'} value="0updated">
                sort by updated data
              </option>
            </select>
            <label
              className="form-check-label text-capitalize bg-gradient bg-info"
              htmlFor="searchOnlyMePacks"
            >
              Select count of packs on page
            </label>
          </div>

          <div>
            <select
              onChange={e => pageCountHandler(e.currentTarget.value)}
              style={{ width: '240px' }}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option defaultChecked={pageCount === 5} value="5">
                5
              </option>
              <option defaultChecked={pageCount === 10} value="10">
                10
              </option>
              <option defaultChecked={pageCount === 25} value="25">
                25
              </option>
              <option defaultChecked={pageCount === 50} value="50">
                50
              </option>
              <option defaultChecked={pageCount === 75} value="75">
                75
              </option>
              <option defaultChecked={pageCount === 100} value="100">
                100
              </option>
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
        <Form.Label>RangeMin {searchedMinValue}</Form.Label>
        <Form.Range value={searchedMinValue} name="min" onChange={changeValue} />
        <Form.Label>RangeMax {searchedMaxValue}</Form.Label>
        <Form.Range value={searchedMaxValue} name="max" onChange={changeValue} />
      </Form.Group>
      <TableCardPacks
        model={CardTableModel()}
        data={data.cardPacks}
        disabled={data.disabled}
        loading={isLoading}
      />
      <PaginationComponent
        pageCardsTotal={10}
        totalCards={data.cardPacksTotalCount}
        activePage={data.page}
        disabled={data.disabled}
        callback={setCurrentPage}
      />
    </div>
  );
};
