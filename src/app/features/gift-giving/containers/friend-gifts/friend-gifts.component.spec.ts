import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendGiftsComponent } from './friend-gifts.component';

describe('FriendGiftsComponent', () => {
  let component: FriendGiftsComponent;
  let fixture: ComponentFixture<FriendGiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendGiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
