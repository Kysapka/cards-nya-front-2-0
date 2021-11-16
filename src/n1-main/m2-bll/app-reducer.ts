export type initAppStateType = {
  preloaderToggle: boolean;
  isAppInitializated: boolean;
  isAuth: boolean;
};

const SET_AUTH = '@@APP_REDUCER/SET_AUTH';
const SET_APP_INITIALIZATE = '@@APP_REDUCER/SET_APP_INITIALIZATE';
const initAppState = {
  preloaderToggle: false,
  isAppInitializated: false,
  isAuth: false,
};

export const AppReducer = (
  // eslint-disable-next-line
  state: initAppStateType = initAppState,
  action: AppActionTypes,
): initAppStateType => {
  switch (action.type) {
    case SET_APP_INITIALIZATE:
      return {
        ...state,
        isAppInitializated: action.isAppInitializated,
      };
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};

export const setAppInitializate = (isAppInitializated: boolean) =>
  ({
    type: SET_APP_INITIALIZATE,
    isAppInitializated,
  } as const);

export const setAuth = (isAuth: boolean) =>
  ({
    type: SET_AUTH,
    isAuth,
  } as const);

export type AppActionTypes =
  | ReturnType<typeof setAppInitializate>
  | ReturnType<typeof setAuth>;
