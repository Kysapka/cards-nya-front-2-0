import { ForGetPasswordReducer } from 'n2-features/f0-test/ForgetPassword';
import { RecoveryPasswordReducer } from 'n2-features/f0-test/RecoveryPass';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer } from '../../n2-features/f0-test';
import { ModalConfirmReducer } from '../../n2-features/f0-test/modalWindow/ModalConfirm/ModuleConfirmReducer';
import { ProfileReducer } from '../../n2-features/f0-test/Profile/Profile-Reducer';
import { RegistrationReducer } from '../../n2-features/f0-test/Registration/RegistrationReducer';
import { CardsReducer } from '../../n2-features/f1-table/cards/CardsReducer';
import { CardPacksReducer } from '../../n2-features/f1-table/packs/PacksReducer';

import { AppReducer } from './app-reducer';
import { ErrorReducer } from './ErrorReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  error: ErrorReducer,
  login: LoginReducer,
  profile: ProfileReducer,
  forgetPassword: ForGetPasswordReducer,
  registration: RegistrationReducer,
  recoveryPasswordReducer: RecoveryPasswordReducer,
  cardPacks: CardPacksReducer,
  cards: CardsReducer,
  modalConfirm: ModalConfirmReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
