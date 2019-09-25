import { createReducer } from '@ngrx/store';


export interface AuthState {
  userName: string;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userName: 'Jeff',
  isAdmin: false
};

const myreducer = createReducer(
  initialState
);

export function reducer(state: AuthState = initialState, action: any) {
  return myreducer(state, action);
}
