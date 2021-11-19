import { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import { getCardPacksTC } from './CardPacksThunk';

export const CardPacks = (): ReactElement => {
  const dispatch = useDispatch();
  const getCardPacksHandler = (): void => {
    dispatch(getCardPacksTC());
  };
  return (
    <div>
      <button type="button" onClick={getCardPacksHandler}>
        GET CARD PACKS
      </button>
    </div>
  );
};
