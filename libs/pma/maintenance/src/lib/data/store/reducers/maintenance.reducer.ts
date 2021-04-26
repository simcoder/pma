import {
    MaintenanceActions,
    MaintenanceActionTypes,
  } from '../actions/maintenance.actions';
  
  export interface State {
    hasCreatedTicket: any;
  }
  
  export const initialState = {
    hasCreatedTicket: null,
  };
  
  export function maintenanceReducer(state: State, action: MaintenanceActions) {
    switch (action.type) {
      case MaintenanceActionTypes.CREATE_TICKET_SUCCESS:
        return {
          ...state,
          hasCreatedTicket: true,
        };
      case MaintenanceActionTypes.CREATE_TICKET_FAILURE:
        return {
          ...state,
          hasCreatedTicket: false,
        };
      default:
        return state;
    }
  }