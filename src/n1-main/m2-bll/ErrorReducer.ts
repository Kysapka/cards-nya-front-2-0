export type initErrorStateType = {
  isError: boolean;
  textError: string;
};

const SET_ERROR = '@@APP_REDUCER/SET_ERROR';
const RESET_ERROR = '@@APP_REDUCER/RESET_ERROR';

const initErrorState = {
  isError: false,
  textError: '',
};

export const ErrorReducer = (
  // eslint-disable-next-line
  state: initErrorStateType = initErrorState,
  action: ErrorActionTypes,
): initErrorStateType => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        isError: action.isError,
        textError: action.textError,
      };
    case RESET_ERROR:
      return {
        ...state,
        isError: false,
        textError: '',
      };
    default:
      return state;
  }
};

export const setError = (isError: boolean, textError: string) =>
  ({
    type: SET_ERROR,
    isError,
    textError,
  } as const);

export const resetError = () =>
  ({
    type: RESET_ERROR,
  } as const);

export type ErrorActionTypes =
  | ReturnType<typeof setError>
  | ReturnType<typeof resetError>;
