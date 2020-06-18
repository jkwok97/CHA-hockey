import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWinStreakLeaderTableComponent } from './team-win-streak-leader-table.component';

describe('TeamWinStreakLeaderTableComponent', () => {
  let component: TeamWinStreakLeaderTableComponent;
  let fixture: ComponentFixture<TeamWinStreakLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamWinStreakLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWinStreakLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
