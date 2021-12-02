import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import { AppRootStateType } from 'n1-main/m2-bll';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useSearchDebounce } from './SearchDebaunceHook';

type SearchNamePackType = {
  callback: (value: string) => void;
};
export const SearchNamePack: FC<SearchNamePackType> = memo(({ callback }) => {
  const [search, setSearch] = useState<string>('');
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const debaunceSearch = useSearchDebounce(search, 3000);
  useEffect(() => {
    callback(debaunceSearch);
  }, [debaunceSearch]);
  return (
    <Form.Control
      disabled={isLoading}
      value={search}
      onChange={onSearchChangeHandler}
      type="text"
      placeholder="Enter card pack name for search..."
    />
  );
});
