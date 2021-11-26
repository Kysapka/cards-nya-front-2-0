import { useState } from 'react';

export const usePacksRequestSettings = (): any => {
  const [searchedPackNameValue, setSearchedPackNameValue] = useState<string>('');
  const [searchedMinValue, setSearchedMinValue] = useState<number>(3);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(0);

  return {
    searchedPackNameValue,
    searchedMinValue,
    searchedMaxValue,
    currentPage,
    setSearchedPackNameValue,
    setSearchedMinValue,
    setSearchedMaxValue,
    setCurrentPage,
  };
};
