import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

export const Profile = (): React.ReactElement => {
  const loginState = useSelector((state: AppRootStateType) => state.login);
  return (
    <div>
      {loginState.avatar !== null ? (
        <div>
          <img src={loginState.avatar} alt="" />
          <h2>My name is: {loginState.name}</h2>
          <p>Date of Create:{loginState.created}</p>
        </div>
      ) : null}
    </div>
  );
};
