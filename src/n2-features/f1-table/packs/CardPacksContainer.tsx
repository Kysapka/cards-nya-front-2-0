import React, { ReactElement, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '../../../n1-main/m1-ui/routes/consts';
import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initAppStateType } from '../../../n1-main/m2-bll/app-reducer';

import { getCardPacksTC } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { SetCardPacksAC } from './PacksReducer';
import { PaginationComponent } from './pagination/Pagination';
import { SearchNamePack } from './SearchNamePack';
import { SearchRange } from './SearchRange';
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
    // disabled,
    filter,
  } = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);

  const { isLoading, isAuth } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  const dispatch = useDispatch();

  const [searchRange, setSearchRange] = useState<{ min: number; max: number }>({
    min: minCardsCount!,
    max: maxCardsCount!,
  });
  const [packName, setPackName] = useState<string>('');
  const [userID, setUserID] = useState<string | null>(null);

  const onlyMeSearchHandler = (checked: boolean): void => {
    if (checked) {
      setUserID(userId);
    } else {
      setUserID(null);
    }
  };
  const onSetRange = (searchedMinValue: number, searchedMaxValue: number): void => {
    setSearchRange({ min: searchedMinValue, max: searchedMaxValue });
  };
  const { min, max } = searchRange;
  const setCurrentPageHandler = (value: number): void => {
    dispatch(SetCardPacksAC({ page: value }));
  };

  const pageCountHandler = (value: number): void => {
    dispatch(SetCardPacksAC({ pageCount: value }));
  };

  useEffect(() => {
    dispatch(
      getCardPacksTC({
        user_id: userID,
        packName,
        pageCount,
        page,
        min,
        max,
        sortPacks: filter,
      }),
    );
  }, [pageCount, page, min, max, packName, userID, filter]);

  return (
    <div className="col-9 align-content-center m-lg-auto">
      <Form.Group
        className="mb-3"
        style={{ width: '400px', marginTop: '40px' }}
        controlId="PacksCardTable"
      >
        <SearchNamePack callback={setPackName} />
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
              disabled={isLoading}
            />
          </div>
          <div>
            <select
              value={pageCount}
              onChange={e => pageCountHandler(+e.currentTarget.value)}
              style={{ width: '240px' }}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              disabled={isLoading}
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
      <SearchRange callback={onSetRange} />
      <TableCardPacks
        model={CardTableModel()}
        // data={cardPacks}
        // disabled={disabled!}
        // loading={isLoading}
      />
      <PaginationComponent
        pageCardsTotal={pageCount!}
        totalCards={cardPacksTotalCount!}
        activePage={page!}
        // disabled={disabled!}
        callback={setCurrentPageHandler}
      />
    </div>
  );
};
