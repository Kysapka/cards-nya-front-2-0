export type initErrorStateType = {
  textError: string;
  textInfo: string;
  Error: boolean;
  Info: boolean;
};

const initErrorState = {
  Error: false,
  textError: '',
  Info: false,
  textInfo: '',
};

export const ErrorReducer = (
  state: initErrorStateType = initErrorState,
  action: ErrorActionTypes,
): initErrorStateType => {
  switch (action.type) {
    case 'RESET_ERROR':
    case 'RESET_All':
    case 'RESET_INFO':
    case 'SET_ERROR':
    case 'SET_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setError = (Error: boolean, textError: string) =>
  ({
    type: 'SET_ERROR',
    payload: { Error, textError },
  } as const);
export const setInfo = (Info: boolean, textInfo: string) =>
  ({
    type: 'SET_INFO',
    payload: { Info, textInfo },
  } as const);

export const resetAll = () =>
  ({
    type: 'RESET_All',
    payload: {
      Error: false,
      textError: '',
      Info: false,
      textInfo: '',
    },
  } as const);
export const resetError = () =>
  ({
    type: 'RESET_ERROR',
    payload: {
      Error: false,
    },
  } as const);
export const resetInfo = () =>
  ({
    type: 'RESET_INFO',
    payload: {
      Info: false,
    },
  } as const);

export type setErrorActionType = ReturnType<typeof setError>;
export type setInfoActionType = ReturnType<typeof setInfo>;
export type resetErrorActionType = ReturnType<typeof resetError>;
export type resetAllActionType = ReturnType<typeof resetAll>;
export type resetInfoActionType = ReturnType<typeof resetInfo>;
export type ErrorActionTypes =
  | setErrorActionType
  | setInfoActionType
  | resetErrorActionType
  | resetInfoActionType
  | resetAllActionType;
