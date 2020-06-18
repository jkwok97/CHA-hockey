import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGoalLeaderTableComponent } from './player-goal-leader-table.component';

describe('PlayerGoalLeaderTableComponent', () => {
  let component: PlayerGoalLeaderTableComponent;
  let fixture: ComponentFixture<PlayerGoalLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGoalLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGoalLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
