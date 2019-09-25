import { RouterState, routerReducer } from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  router: RouterState.Minimal;
  auth: fromAuth.AuthState;
}


export const reducers = {
  router: routerReducer,
  auth: fromAuth.reducer
};

// Selectors

// 1. No "feature selector" beacause we ARE the app

// 2. Selector per branch

export const selectAuthBranch = (state: AppState) => state.auth;

// 3. for the components
export const selectIsAdmin = createSelector(selectAuthBranch, a => a.isAdmin);
export const selectUserName = createSelector(selectAuthBranch, a => a.userName);
