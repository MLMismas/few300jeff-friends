import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import { holidayAdded } from '../../../actions/holidays.actions';

@Component({
  selector: 'app-holiday-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addItem(nameEl: HTMLInputElement, dateEl: HTMLInputElement) {
    const name = nameEl.value;
    const date = dateEl.valueAsDate.toISOString();
    // dispatch!
    this.store.dispatch(holidayAdded({ name, date }));

    nameEl.value = '';
    dateEl.value = '';
    nameEl.focus();
  }
}
