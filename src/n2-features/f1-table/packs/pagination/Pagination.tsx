import { ReactElement } from 'react';

import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../../n1-main/m2-bll';

import { createPages } from './createPage';

type PaginationComponentPropsType = {
  activePage: number;
  totalCards: number;
  pageCardsTotal: number;
  // disabled: boolean;
  callback: (currentPage: number) => void;
};

export const PaginationComponent = (
  props: PaginationComponentPropsType,
): ReactElement => {
  const disabled = useSelector<AppRootStateType, boolean>(
    state => state.cardPacks.disabled!,
  );
  const { activePage, pageCardsTotal, totalCards } = props;
  const pageTotalCount: number = Math.ceil(totalCards / pageCardsTotal);
  const items: Array<number> = [];
  createPages(items, pageTotalCount, activePage);
  const onClickHandler = (page: number): void => {
    props.callback(page);
    // dispatch(SetPagePacksAC(page));
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
