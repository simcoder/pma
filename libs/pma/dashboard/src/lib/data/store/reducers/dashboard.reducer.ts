import { DashboardActions, DashboardActionTypes } from '../actions/dashboard.actions';

export {} from '../actions/dashboard.actions';
export interface State {
  hasLoaded: boolean;
  tenant: any;
}

export const initialState: State = {
  tenant: null,
  hasLoaded: false,
};

export function dashboardReducer(state: State, action: DashboardActions){
  switch (action.type) {
    case DashboardActionTypes.LOAD_TENTANT_SUCESS:
      return {
        ...state,
        hasLoaded: true,
        tenant: action.payload,
      };
    case DashboardActionTypes.LOAD_TENTANT_FAILURE:
      return {
        ...state,
        hasLoaded: false,
      };
    default:
      return state;
  }
}
