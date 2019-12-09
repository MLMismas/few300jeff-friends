import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectDashboardModel } from '../../reducers';
import { DashboardModel } from '../../models/dashboard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model$: Observable<DashboardModel[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.model$ = this.store.select(selectDashboardModel);
  }

}
