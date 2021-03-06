export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducer';
import * as fromFriends from './friend.reducer';
import * as fromFriendHoliday from './friend-holiday.reducer';
import * as moment from 'moment';

import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { HolidayListItem, FriendHoliday } from '../models';
import { FriendListItem } from '../containers/friends/models';
import { DashboardModel } from '../models/dashboard';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
  friends: fromFriends.FriendState;
  friendHoliday: fromFriendHoliday.FriendHolidayState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer,
  friends: fromFriends.reducer,
  friendHoliday: fromFriendHoliday.reducer
};


// Feature Selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);

// Selector Per Branch (e.g., one for 'holidays')
const selectHolidaysBranch = createSelector(selectFeature, b => b.holidays);
const selectUiHintsBranch = createSelector(selectFeature, b => b.uiHints);
const selectFriendsBranch = createSelector(selectFeature, b => b.friends);
const selectFriendHolidaysBranch = createSelector(selectFeature, b => b.friendHoliday);
// 'Helpers'
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, b => b.showAll);
export const selectSortingHolidaysBy = createSelector(selectUiHintsBranch, b => b.sortHolidaysBy);
export const selectFriendsArray = createSelector(selectFriendsBranch, fromFriends.selectFriendsArray);
export const selectSelectedFriendId = createSelector(selectFriendsBranch, b => b.selectedFriend);
export const selectFriendEntities = createSelector(selectFriendsBranch, fromFriends.selectFriendEntities);

export const selectFriendHolidayEntities = createSelector(selectFriendHolidaysBranch,
  fromFriendHoliday.selectFriendHolidayEntities);

// returns either {holidaysCelebrated:[]} | null
export const selectFriendHolidayEntitiesForSelectedFriend =
  createSelector(selectSelectedFriendId, selectFriendHolidayEntities,
    (id, friends) => friends[id] ? friends[id].holidaysCelebrated : null);
// Then what your components need.

export const selectSelectedFriend = createSelector(selectSelectedFriendId, selectFriendEntities, (id, entities) => entities[id]);

export const selectHolidaysLoaded = createSelector(selectUiHintsBranch, b => b.holidaysLoaded);
// - we need one that returns a HolidayListItem[] for our holidaylist component.

const selectHolidayListItemsUnFiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date(),
    isTemporary: holiday.id.startsWith('T')
  } as HolidayListItem))
);

const selectHolidayListSorted = createSelector(selectHolidayListItemsUnFiltered, selectSortingHolidaysBy,
  (list, by) => {
    return [...list.sort((lhs, rhs) => {
      if (lhs[by] < rhs[by]) {
        // TODO: Make this case -insensitive if they are sorting by name.
        return -1;
      }
      if (lhs[by] > rhs[by]) {
        return 1;
      }
      return 0;
    })];
  }
);
export const selectHolidayListItems = createSelector(selectShowAllHolidays, selectHolidayListSorted, (all, holidays) =>
  holidays.filter(h => all ? true : !h.past)
);


export const selectFriendListItems = createSelector(selectFriendsArray, friends =>
  friends.map(friend => ({
    id: friend.id,
    name: friend.name,
    isTemporary: friend.id.startsWith('T')
  } as FriendListItem))
);

// selector that returns the friend holiday model for all friends
export const selectAllFriendsHolidayModel = createSelector(
  selectFriendsArray,
  selectHolidayListItemsUnFiltered,
  selectFriendHolidayEntities,
  (friends, allHolidays, friendEntities) => {
    const allFriendsHolidayModel = [] as FriendHoliday[];
    friends.forEach(friend => {
      const celebratedHolidays = friendEntities[friend.id] ? friendEntities[friend.id].holidaysCelebrated : [];
      const nonCelebrated = allHolidays
        .filter(h => !celebratedHolidays.includes(h.id))
        .map(h => ({ id: h.id, name: h.name }));
      const celebrated = allHolidays
        .filter(h => celebratedHolidays.includes(h.id))
        .map(h => ({ id: h.id, name: h.name }));
      allFriendsHolidayModel.push({
        id: friend.id,
        name: friend.name,
        nonCelebratedHolidays: nonCelebrated,
        celebratedHolidays: celebrated
      } as FriendHoliday);
    });
    allFriendsHolidayModel.forEach(element => {
      element.celebratedHolidays.forEach(holiday => {
        console.log(element.name + ' ' + holiday.name);
      });
    });
    return allFriendsHolidayModel;
  }
);

// a selector that returns the model of FriendHoliday
export const selectFriendHolidayModel = createSelector(
  selectSelectedFriend,
  selectHolidayListItemsUnFiltered,
  selectFriendHolidayEntitiesForSelectedFriend,
  (friend, allHolidays, celebratedHolidays) => {
    celebratedHolidays = celebratedHolidays || [];
    const nonCelebrated = allHolidays
      .filter(h => !celebratedHolidays.includes(h.id))
      .map(h => ({ id: h.id, name: h.name }));
    const celebrated = allHolidays
      .filter(h => celebratedHolidays.includes(h.id))
      .map(h => ({ id: h.id, name: h.name }));
    return ({
      id: friend.id,
      name: friend.name,
      nonCelebratedHolidays: nonCelebrated,
      celebratedHolidays: celebrated
    } as FriendHoliday);
  }
);

export const selectDashboardModel = createSelector(
  selectHolidayListSorted,
  selectAllFriendsHolidayModel,
  (holiday, friends) => {
    const upcomingSortedHolidays = [...holiday.filter(h => !h.past)];
    console.log(upcomingSortedHolidays);
    return upcomingSortedHolidays.map(h => ({
      holidayId: h.id,
      holidayName: h.name + ' (' + moment(h.date).format('MMMM Do, YYYY') + ')',
      friends: getFriendsForHoliday(h.id, friends)
    } as DashboardModel));

  }
);


// Given a holiday, and all the recipients, which recipients celebrate that holiday?
function getFriendsForHoliday(holidayId: string, recipients: FriendHoliday[]) {
  const recipientsCelebratingThatHoliday = recipients.filter(r => r.celebratedHolidays.some(h => h.id === holidayId));
  return recipientsCelebratingThatHoliday.map(r => ({ id: r.id, name: r.name }));
}
