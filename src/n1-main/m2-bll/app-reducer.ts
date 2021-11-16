export type initAppStateType = {
  isLoading: boolean;
  isAppInitializated: boolean;
  isAuth: boolean;
};

const SET_AUTH = '@@APP_REDUCER/SET_AUTH';
const SET_APP_INITIALIZATE = '@@APP_REDUCER/SET_APP_INITIALIZATE';
const PRELOADER_TOGGLE = '@@APP_REDUCER/PRELOADER_TOGGLE';
const initAppState = {
  isLoading: false,
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
    case '@@APP_REDUCER/PRELOADER_TOGGLE':
      return {
        ...state,
        isLoading: action.isLoading,
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

export const preloaderToggle = (isLoading: boolean) =>
  ({ type: PRELOADER_TOGGLE, isLoading } as const);

export const setAuth = (isAuth: boolean) =>
  ({
    type: SET_AUTH,
    isAuth,
  } as const);

export type AppInitializateActionType = ReturnType<typeof setAppInitializate>;
export type setAuthActionType = ReturnType<typeof setAuth>;
export type preloaderToggleActionType = ReturnType<typeof preloaderToggle>;
export type AppActionTypes =
  | AppInitializateActionType
  | setAuthActionType
  | preloaderToggleActionType;
