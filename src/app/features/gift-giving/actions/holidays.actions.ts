import { createAction, props } from '@ngrx/store';
import { HolidayEntity } from '../reducers/holidays.reducer';

let currentId = 1;

export const holidayAdded = createAction(
  '[gift giving] holiday added ',
  ({ name, date }: { name: string, date: string }) => ({
    entity: {
      id: 'T' + currentId++,
      name,
      date
    } as HolidayEntity
  })
);

export const holidayAddedSuccess = createAction(
  '[gift giving] holiday added success',
  props<{ oldId: string, newEntity: HolidayEntity }>()
);

export const holidayAddedFailure = createAction(
  '[gift giving] holiday added failure',
  props<{ message: string, entity: HolidayEntity }>()
);

export const loadHolidayData = createAction(
  '[gift giving] load holiday data'
);

export const loadDataSucceeded = createAction(
  '[gift giving] load data succeeded',
  props<{ data: HolidayEntity[] }>()
);

export const loadDataFailed = createAction(
  '[gift giving] load data failed',
  props<{ message: string }>()
);
