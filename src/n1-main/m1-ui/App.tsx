import React, { useEffect } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from '../m2-bll';
import { authMeThunk } from '../m2-bll/AppThunks';

import { Loader } from './common/Loader';
import { Main } from './Main';

export const App = (): React.ReactElement => {
  const isloading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);
  const isAppInitializated = useSelector<AppRootStateType, boolean>(
    state => state.app.isAppInitializated,
  );

  if (!isAppInitializated) {
    return <Loader />;
  }
  // eslint-disable-next-line consistent-return
  document.onkeydown = function gg(e) {
    if (isloading && e.keyCode === 116) return false;
  };
  const utterance = new SpeechSynthesisUtterance(
    'это игра про карточки приятной игры но в начале зарегестрируйтесь или войдите в профиль ня ня ня ня ',
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.speechSynthesis.speak(utterance);
    dispatch(authMeThunk());
  }, []);
  return (
    <div className="App">
      <Main />
    </div>
  );
};
