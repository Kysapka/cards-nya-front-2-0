import { useState } from 'react';

export const usePacksRequestSettings = (): any => {
  const [searchedPackNameValue, setSearchedPackNameValue] = useState<string>('');
  const [searchedMinValue, setSearchedMinValue] = useState<number>(3);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const [sortFilter, setSortFilter] = useState<string>('0updated');

  return {
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
  };
};
