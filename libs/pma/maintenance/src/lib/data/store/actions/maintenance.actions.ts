import { Action } from "@ngrx/store";

export enum MaintenanceActionTypes {
    CREATE_TICKET_SUCCESS = "CREATE TICKET SUCCESS",
    CREATE_TICKET_FAILURE = "CREATE TICKET FAILURE",
    CREATE_TICKET = "CREATE TICKET"
}
export class CreateTicketSuccess implements Action {
    readonly type = MaintenanceActionTypes.CREATE_TICKET_SUCCESS;
}

export class CreateTicket implements Action {
    readonly type = MaintenanceActionTypes.CREATE_TICKET;
    constructor(public ticket: any) { }
}

export class CreateTicketFailure implements Action {
    readonly type = MaintenanceActionTypes.CREATE_TICKET_FAILURE;
}

export type MaintenanceActions =
| CreateTicketFailure
| CreateTicket
| CreateTicketSuccess;