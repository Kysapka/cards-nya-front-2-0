import { ReactElement } from 'react';

import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { SetPagePacksAC } from '../PacksReducer';

import { createPages } from './createPage';

type PaginationComponentPropsType = {
  activePage: number;
  totalCards: number;
  pageCardsTotal: number;
  disabled: boolean;
};

export const PaginationComponent = (
  props: PaginationComponentPropsType,
): ReactElement => {
  const { activePage, pageCardsTotal, totalCards, disabled } = props;
  const pageTotalCount: number = Math.ceil(totalCards / pageCardsTotal);
  const items: Array<number> = [];
  createPages(items, pageTotalCount, activePage);
  const dispatch = useDispatch();
  const onClickHandler = (page: number): void => {
    dispatch(SetPagePacksAC(page));
  };
  return (
    <Pagination>
      {items.map(page => (
        <Pagination.Item
          key={page}
          onClick={() => onClickHandler(page)}
          active={page === activePage}
          disabled={disabled}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
