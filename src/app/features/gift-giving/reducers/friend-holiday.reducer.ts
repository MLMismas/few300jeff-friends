import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friend-holiday.actions';


export interface FriendHolidayEntity {
  id: string;
  holidaysCelebrated: string[];
}

export interface FriendHolidayState extends EntityState<FriendHolidayEntity> {

}

export const adapter = createEntityAdapter<FriendHolidayEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.assignHolidayToFriend, (state, action) => {

    if (state.entities[action.friendId]) {
      const update: Update<FriendHolidayEntity> = {
        id: action.friendId,
        changes: {
          holidaysCelebrated: [action.holidayId, ...state.entities[action.friendId].holidaysCelebrated]
        }
      };
      return adapter.updateOne(update, state);
    } else {

      return adapter.addOne({
        id: action.friendId,
        holidaysCelebrated: [action.holidayId]
      }, state);
    }

  })
);

export function reducer(state: FriendHolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}

export const { selectEntities: selectFriendHolidayEntities } = adapter.getSelectors();



