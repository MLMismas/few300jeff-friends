import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/holidays.actions';


export interface HolidayEntity {
  id: string;
  name: string;
  date: string;
}

export interface HolidayState extends EntityState<HolidayEntity> {

}

export const adapter = createEntityAdapter<HolidayEntity>();

const { selectAll } = adapter.getSelectors();
export const selectHolidayArray = selectAll;

const initialState = adapter.getInitialState();



const reducerFunction = createReducer(
  initialState,
  on(actions.holidayAdded, (state, action) => adapter.addOne(action.entity, state)),
  on(actions.loadDataSucceeded, (state, action) => adapter.addAll(action.data, state)),
  on(actions.holidayAddedSuccess, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.newEntity, tempState);
  }),
  on(actions.holidayAddedFailure, (state, action) => adapter.removeOne(action.entity.id, state))
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}



