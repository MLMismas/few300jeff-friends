import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { loadHolidayData } from '../actions/holidays.actions';
import { loadFriends } from '../actions/friend.actions';

@Injectable()
export class AppEffects {

  applicationStartedStuff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => sortFilterActions.loadSavedPrefs())
    ), { dispatch: true }
  );

  onAppStartLoadHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadHolidayData())
    ), { dispatch: true }
  );

  onAppStartLoadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadFriends())
    ), { dispatch: true }
  );

  constructor(private actions$: Actions) { }
}
