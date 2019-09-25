import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as friendsActions from '../actions/friend.actions';
import { environment } from '../../../../environments/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FriendEntity } from '../reducers/friend.reducer';
import { of } from 'rxjs';

@Injectable()
export class FriendEffects {

  addFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendsActions.addFriend),
      switchMap((a) => this.client.post<FriendEntity>(environment.friendsUrl, a.entity)
        .pipe(
          map(newFriend => friendsActions.addFriendSucceeded({ oldId: a.entity.id, entity: newFriend })),
          catchError(err => {
            console.log(err);
            return of(friendsActions.addFriendFailed({ entity: a.entity, message: 'Adding Friend Failes' }));
          })
        )

      )
    )
  );

  loadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendsActions.loadFriends),
      switchMap(() => this.client.get<{ friends: FriendEntity[] }>(environment.friendsUrl)
        .pipe(
          map(response => response.friends),
          map(friends => friendsActions.loadFriendsSucceeded({ friends }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}
