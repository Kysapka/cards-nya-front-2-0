import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import { Form } from 'react-bootstrap';

import { useSearchDebounce } from './SearchDebaunceHook';

type SearchNamePackType = {
  callback: (value: string) => void;
};
export const SearchNamePack: FC<SearchNamePackType> = memo(({ callback }) => {
  const [search, setSearch] = useState<string>('');
  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.currentTarget.value);
  };

  const debaunceSearch = useSearchDebounce(search, 3000);
  useEffect(() => {
    callback(debaunceSearch);
  }, [debaunceSearch]);
  return (
    <Form.Control
      value={search}
      onChange={onSearchChangeHandler}
      type="text"
      placeholder="Enter card pack name for search..."
    />
  );
});
