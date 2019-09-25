import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import * as actions from '../../../actions/friend.actions';
@Component({
  selector: 'app-friend-entry',
  templateUrl: './friend-entry.component.html',
  styleUrls: ['./friend-entry.component.css']
})
export class FriendEntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addFriend(friendEl: HTMLInputElement) {
    const friend = friendEl.value;
    this.store.dispatch(actions.addFriend({ name: friend }));
    friendEl.value = '';
    friendEl.focus();

  }
}
