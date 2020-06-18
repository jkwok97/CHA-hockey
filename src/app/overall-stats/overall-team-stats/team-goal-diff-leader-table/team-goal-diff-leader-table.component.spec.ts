import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGoalDiffLeaderTableComponent } from './team-goal-diff-leader-table.component';

describe('TeamGoalDiffLeaderTableComponent', () => {
  let component: TeamGoalDiffLeaderTableComponent;
  let fixture: ComponentFixture<TeamGoalDiffLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGoalDiffLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGoalDiffLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
