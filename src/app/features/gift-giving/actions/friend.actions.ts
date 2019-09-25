import { createAction, props } from '@ngrx/store';
import { FriendListItem } from '../containers/friends/models';
import { FriendEntity } from '../reducers/friend.reducer';

let currentId = 1;
export const loadFriends = createAction(
  '[gift giving] load friends'
);


export const loadFriendsSucceeded = createAction(
  '[gift giving] load friends success',
  props<{ friends: FriendEntity[] }>()
);

export const addFriend = createAction(
  '[gift giving] add friend',
  ({ name }: { name: string }) => ({
    entity: {
      id: 'T' + currentId++,
      name
    }
  })
);

export const addFriendSucceeded = createAction(
  '[gift giving] add friend succeeded',
  props<{ oldId: string, entity: FriendEntity }>()
);

export const addFriendFailed = createAction(
  '[gift giving] add friend failed',
  props<{ entity: FriendEntity, message: string }>()
);
