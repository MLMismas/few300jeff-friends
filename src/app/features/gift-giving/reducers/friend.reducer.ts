import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friend.actions';
export interface FriendEntity {
  id: string;
  name: string;
}

export interface FriendState extends EntityState<FriendEntity> {

}

export const adapter = createEntityAdapter<FriendEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.loadFriendsSucceeded, (state, action) => adapter.addAll(action.friends, state)),
  on(actions.addFriend, (state, action) => adapter.addOne(action.entity, state))
);

export function reducer(state: FriendState = initialState, action: Action) {
  return reducerFunction(state, action);
}


export const { selectAll: selectFriendsArray } = adapter.getSelectors();
