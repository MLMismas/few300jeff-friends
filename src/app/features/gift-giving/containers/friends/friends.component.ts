import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectFriendListItems } from '../../reducers';
import { Observable } from 'rxjs';
import { FriendListItem } from './models';
import { loadFriends } from '../../actions/friend.actions';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends$: Observable<FriendListItem[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.friends$ = this.store.select(selectFriendListItems);
    this.store.dispatch(loadFriends());
  }

}
