import React, { ChangeEvent, MouseEvent, ReactElement, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { getCardPacksTC, getPacksCommonRequestParamsType } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { useDebounce } from './CustomUseDebaunceHook';
import { PaginationComponent } from './pagination/Pagination';
import { TableCardPacks } from './TableCardPacks';
import { CardPacksType } from './types';

export const CardPacksContainer = (): ReactElement => {
  const userId = useSelector<AppRootStateType, string | undefined>(
    state => state.profile._id,
  );
  const data = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const dispatch = useDispatch();
  const [searchedPackNameValue, setSearchedPackNameValue] = useState<string>('');
  const [searchedMinValue, setSearchedMinValue] = useState<number>(3);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(9);
  const [isSearchOnlyMe, setIsSearchOnlyMe] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchCommonRequestPack, setSearchCommonRequestPack] =
    useState<getPacksCommonRequestParamsType>({});
  const debouncedSearchTerm = useDebounce(searchCommonRequestPack, 3000);

  useEffect(() => {
    setSearchCommonRequestPack({
      packName: searchedPackNameValue,
      min: searchedMinValue,
      max: searchedMaxValue,
      sortPacks: '0updated',
      page: currentPage,
      pageCount: 10,
      user_id: '',
    });
  }, [searchedPackNameValue, searchedMinValue, searchedMaxValue]);
  useEffect(() => {
    if (currentPage !== 0) {
      dispatch(getCardPacksTC({ ...searchCommonRequestPack, page: currentPage }));
    }
  }, [currentPage]);

  const onlyMeSearchHandler = (checked: boolean): void => {
    if (checked) {
      dispatch(getCardPacksTC({ user_id: userId }));
    } else {
      dispatch(getCardPacksTC({ ...searchCommonRequestPack }));
    }
  };
  // useEffect(() => {
  //   if (isSearchOnlyMe) {
  //     console.log(userId);
  //     setSearchCommonRequestPack({ ...searchCommonRequestPack, user_id: userId });
  //   } else {
  //     setSearchCommonRequestPack({ ...searchCommonRequestPack, user_id: '' });
  //     console.log(searchCommonRequestPack.user_id);
  //   }
  // }, [isSearchOnlyMe]);
  useEffect(() => {
    // Убедиться что у нас есть значение (пользователь ввел что-то)
    if (debouncedSearchTerm) {
      // Сделать запрос к АПИ
      if (Object.keys(searchCommonRequestPack).length !== 0) {
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
        <div style={{ marginTop: '20px' }}>
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
            value=""
            id="searchOnlyMePacks"
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Range Min {searchedMinValue}</Form.Label>
        <Form.Range value={searchedMinValue} name="min" onChange={changeValue} />
        <Form.Label>Range Max {searchedMaxValue}</Form.Label>
        <Form.Range value={searchedMaxValue} name="max" onChange={changeValue} />
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
        callback={setCurrentPage}
      />
    </div>
  );
};
