import { Component, OnInit, Input } from '@angular/core';
import { FriendListItem } from '../models';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  @Input() model: FriendListItem[] = [];
  constructor() { }

  ngOnInit() {
  }

}
