type ModuleConfirmStateType = {
  stateShow: boolean;
};
const ModuleConfirmState = {
  stateShow: false,
};
export const ModalConfirmReducer = (
  // eslint-disable-next-line
  state: ModuleConfirmStateType = ModuleConfirmState,
  action: ModuleConfirmActionTypes,
): ModuleConfirmStateType => {
  switch (action.type) {
    case 'CHANGE-STATUS-SHOW': {
      return { ...state, stateShow: action.statusShow };
    }

    default:
      return state;
  }
};

export const ChangeModalShowStatusAC = (statusShow: boolean) =>
  ({ type: 'CHANGE-STATUS-SHOW', statusShow } as const);
export const ChangeModalAgreeStatusAC = (agree: boolean) =>
  ({ type: 'CHANGE-STATUS-AGREE', agree } as const);

type ModuleConfirmActionTypes =
  | ReturnType<typeof ChangeModalShowStatusAC>
  | ReturnType<typeof ChangeModalAgreeStatusAC>;
