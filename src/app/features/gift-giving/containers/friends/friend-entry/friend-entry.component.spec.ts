import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendEntryComponent } from './friend-entry.component';

describe('FriendEntryComponent', () => {
  let component: FriendEntryComponent;
  let fixture: ComponentFixture<FriendEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
