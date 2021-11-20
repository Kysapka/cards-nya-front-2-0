import { ReactElement, ReactNode } from 'react';

import { useDispatch } from 'react-redux';

import { getCardPacksTC } from './CardPacksThunk';
import { TableCardPacks } from './TableCardPacks';

export const CardPacksContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const getCardPacksHandler = (): void => {
    dispatch(getCardPacksTC());
  };
  const testProps = {
    model: [
      {
        title: () => 'ReactNode',
        render: (dataItem: any, modelIndex: number, dataIndex: number) => 'ReactNode',
      },
    ],
    data: 'someText',
  };
  return (
    <div>
      <button type="button" onClick={getCardPacksHandler}>
        GET CARD PACKS
      </button>
      {/* <TableCardPacks {...testProps} /> */}
    </div>
  );
};
