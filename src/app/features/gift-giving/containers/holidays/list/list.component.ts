import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HolidayListItem, FriendHoliday } from '../../../models';
import { GiftGivingState, selectAllFriendsHolidayModel } from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { assignHolidayToFriend } from '../../../actions/friend-holiday.actions';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() model: HolidayListItem[] = [];
  constructor(private store: Store<GiftGivingState>) { }

  friends$: Observable<FriendHoliday[]>;

  ngOnInit() {
    this.friends$ = this.store.select(selectAllFriendsHolidayModel);
  }

  addHoliday(friendId: string, holidayId: string) {
    this.store.dispatch(assignHolidayToFriend({ friendId, holidayId }));
  }

}
