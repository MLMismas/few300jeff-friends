import { createAction } from '@ngrx/store';

export const filterShowAll = createAction(
  '[gift-giving] filter show all'
);


export const filterShowOnlyUpcoming = createAction(
  '[gift-giving] filter show only upcoming'
);

export const sortHolidaysByName = createAction(
  '[gift-giving] sort holidays by name'
);

export const sortHolidaysByDate = createAction(
  '[gift-giving] sort holidays by date'
);


export const loadSavedPrefs = createAction(
  '[gift-giving] load saved preferences'
);
