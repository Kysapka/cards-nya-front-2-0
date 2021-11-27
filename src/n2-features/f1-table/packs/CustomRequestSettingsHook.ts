import { useState } from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

export const usePacksRequestSettings = (): any => {
  const max = useSelector<AppRootStateType, number>(
    state => state.cardPacks.maxCardsCount!,
  );
  const [searchedPackNameValue, setSearchedPackNameValue] = useState<string>('');
  const [searchedMinValue, setSearchedMinValue] = useState<number>(0);
  const [searchedMaxValue, setSearchedMaxValue] = useState<number>(max);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const [sortFilter, setSortFilter] = useState<string>('0updated');
  const [userID, setUserID] = useState<string | undefined>(undefined);

  return {
    searchedPackNameValue,
    searchedMinValue,
    searchedMaxValue,
    currentPage,
    pageCount,
    onlyMe,
    sortFilter,
    userID,
    setSearchedPackNameValue,
    setSearchedMinValue,
    setSearchedMaxValue,
    setCurrentPage,
    setPageCount,
    setOnlyMe,
    setSortFilter,
    setUserID,
  };
};
