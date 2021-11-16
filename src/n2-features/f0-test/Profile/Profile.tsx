import React from 'react';

import { useSelector } from 'react-redux';

import { AppRootStateType } from '../../../n1-main/m2-bll';

export const Profile = (): React.ReactElement => {
  const profileState = useSelector((state: AppRootStateType) => state.profile);
  console.log('render');
  return (
    <div>
      {profileState.avatar !== null ? (
        <div>
          <img src={profileState.avatar} alt="" />
          <h2>My name is: {profileState.name}</h2>
          <p>Date of Create:{profileState.created}</p>
          <button>Logout</button>
        </div>
      ) : null}
    </div>
  );
};
