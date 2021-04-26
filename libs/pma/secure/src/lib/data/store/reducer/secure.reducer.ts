import { SecureActions, SecureActionTypes } from '../actions/secure.actions';

export interface State {
  menu: any;
  hasLoaded: boolean;
  user: any;
  hasLoadedUser: boolean;
}

export const initialState: State = {
  menu: null,
  hasLoaded: false,
  user: null,
  hasLoadedUser: false,
};

export function secureReducer(state: State, action: SecureActions) {
  switch (action.type) {
    case SecureActionTypes.LOAD_APP_MENU_SUCCESS:
      return {
        ...state,
        hasLoaded: true,
        menu: action.payload,
      };
    case SecureActionTypes.LOAD_APP_MENU_FAILURE:
      return {
        ...state,
        hasLoaded: false,
      };
    case SecureActionTypes.LOAD_APP_USER_SUCCESS:
      return {
        ...state,
        hasLoadedUser: true,
        user: action.payload,
      };
    case SecureActionTypes.LOAD_APP_USER_FAILURE:
      return {
        ...state,
        hasLoadedUser: false,
      };
    case SecureActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        hasLoadedUser: true,
        user: action.user,
      };
    case SecureActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        hasLoadedUser: false,
        user: null,
      };
    default:
      return state;
  }
}
