import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMinutesLeaderTableComponent } from './player-minutes-leader-table.component';

describe('PlayerMinutesLeaderTableComponent', () => {
  let component: PlayerMinutesLeaderTableComponent;
  let fixture: ComponentFixture<PlayerMinutesLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMinutesLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMinutesLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
