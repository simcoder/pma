import { createFeatureSelector } from "@ngrx/store";

export const selectMaintenanceState = createFeatureSelector<any>('maintenance');