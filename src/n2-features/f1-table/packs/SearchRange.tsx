import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';
import { initAppStateType } from '../../../n1-main/m2-bll/app-reducer';

import { useRangeDebounce } from './RangeDebaunceHook';
import { CardPacksType } from './types';

type RangePropsType = {
  callback: (debauncedMinRangeValue: number, debauncedMaxRangeValue: number) => void;
};
export const SearchRange: React.FC<RangePropsType> = ({ callback }): ReactElement => {
  const { minCardsCount, maxCardsCount } = useSelector<AppRootStateType, CardPacksType>(
    state => state.cardPacks,
  );
  const { isLoading } = useSelector<AppRootStateType, initAppStateType>(
    state => state.app,
  );
  const [searchedMinValue, setSearchedMinValue] = useState<number>(minCardsCount!);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(maxCardsCount!);

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
  useEffect(() => {
    callback(debauncedMinRangeValue, debauncedMaxRangeValue);
  }, [debauncedMinRangeValue, debauncedMaxRangeValue]);
  return (
    <Form.Group>
      <Form.Label>RangeMin {searchedMinValue} </Form.Label>
      <Form.Range
        value={searchedMinValue}
        disabled={isLoading}
        name="min"
        onChange={changeRangeValue}
      />
      <Form.Label>RangeMax {searchedMaxValue}</Form.Label>
      <Form.Range
        value={searchedMaxValue}
        disabled={isLoading}
        name="max"
        onChange={changeRangeValue}
      />
    </Form.Group>
  );
};
