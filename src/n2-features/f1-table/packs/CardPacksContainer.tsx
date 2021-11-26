import React, {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

import { getCardPacksTC, getPacksCommonRequestParamsType } from './CardPacksThunk';
import { CardTableModel } from './CardTableModel';
import { useDebounce } from './CustomUseDebaunceHook';
import { SetValueCardsCountPacksAC } from './PacksReducer';
import { PaginationComponent } from './pagination/Pagination';
import { TableCardPacks } from './TableCardPacks';
import { CardPacksType } from './types';

export const CardPacksContainer = (): ReactElement => {
  // const valueSearch = useRef<string>();
  const data = useSelector<AppRootStateType, CardPacksType>(state => state.cardPacks);
  const dispatch = useDispatch();
  const [searchedPackNameValue, setSearchedPackNameValue] = useState<string>('');
  const [searchedMinValue, setSearchedMinValue] = useState<number>(3);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(9);
  const [searchCommonRequestPack, setSearchCommonRequestPack] =
    useState<getPacksCommonRequestParamsType>({});
  const debouncedSearchTerm = useDebounce(searchCommonRequestPack, 3000);

  useEffect(() => {
    setSearchCommonRequestPack({
      packName: searchedPackNameValue,
      min: searchedMinValue,
      max: searchedMaxValue,
      sortPacks: '0updated',
      page: data.page,
      pageCount: 20,
      user_id: '',
    });
  }, [searchedPackNameValue, searchedMinValue, searchedMaxValue]);
  /*  useEffect(() => {
    dispatch(getCardPacksTC({ ...setSearchCommonRequestPack, page: data.page }));
  }, [data.page]); */
  useEffect(() => {
    // Убедиться что у нас есть значение (пользователь ввел что-то)
    if (debouncedSearchTerm) {
      // Сделать запрос к АПИ
      if (Object.keys(searchCommonRequestPack).length !== 0) {
        dispatch(getCardPacksTC(debouncedSearchTerm));
      }
    }
  }, [debouncedSearchTerm]);

  const userId = useSelector<AppRootStateType, string | null>(state => state.profile._id);
  const Search = (e: MouseEvent<HTMLButtonElement>): void => {
    // if (e.currentTarget.name === 'search') {
    //   dispatch(
    //     getCardPacksTC({
    //       min: data.minCardsCount,
    //       max: data.minCardsCount,
    //       page: data.page,
    //     }),
    //   );
    // } else if (e.currentTarget.name === 'searchMyCards') {
    //   if (userId) {
    //     dispatch(
    //       getCardPacksTC({
    //         min: data.minCardsCount,
    //         max: data.maxCardsCount,
    //         page: data.page,
    //         user_id: userId,
    //       }),
    //     );
    //   }
    // } else if (e.currentTarget.name === 'searchInputCardPack') {
    //   dispatch(
    //     getCardPacksTC({
    //       min: data.minCardsCount,
    //       max: data.maxCardsCount,
    //       page: data.page,
    //       packName: valueSearch.current,
    //     }),
    //   );
    // }
  };
  const changeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.name === 'max') {
      const max = Number(event.currentTarget.value);
      setSearchedMaxValue(max);
      // dispatch(SetValueCardsCountPacksAC(data.minCardsCount, max));
    }
    if (event.currentTarget.name === 'min') {
      const min = Number(event.currentTarget.value);
      setSearchedMinValue(min);
      // dispatch(SetValueCardsCountPacksAC(min, data.maxCardsCount));
    }
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchedPackNameValue(event.currentTarget.value);
    // valueSearch.current = event.currentTarget.value;
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
        <Form.Label>RangeMin {searchedMinValue}</Form.Label>
        <Form.Range value={searchedMinValue} name="min" onChange={changeValue} />
        <Form.Label>RangeMax {searchedMaxValue}</Form.Label>
        <Form.Range value={searchedMaxValue} name="max" onChange={changeValue} />
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
