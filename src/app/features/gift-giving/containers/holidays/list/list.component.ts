import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HolidayListItem } from '../../../models';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() model: HolidayListItem[] = [];
  constructor() { }

  ngOnInit() {
  }

}
