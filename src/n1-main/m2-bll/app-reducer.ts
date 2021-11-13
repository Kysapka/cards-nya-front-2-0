import { Dispatch } from 'redux';

import { API } from '../m3-dal/API';

export type initAppStateType = {
  someProperty: string;
};

const initAppState = {
  someProperty: '',
};

export const AppReducer = (
  state: initAppStateType = initAppState,
  action: AppActionTypes,
): initAppStateType => {
  switch (action.type) {
    case 'TEST_CASE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const testAction = (param: string) =>
  ({
    type: 'TEST_CASE',
    payload: { param },
  } as const);

export const testThunk = (param: string) => (dispatch: Dispatch) => {
  API.appAPI
    .fakeRequest(param)
    .then(res => {
      dispatch(testAction('app'));
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export type testActionType = ReturnType<typeof testAction>;
export type AppActionTypes = testActionType;
