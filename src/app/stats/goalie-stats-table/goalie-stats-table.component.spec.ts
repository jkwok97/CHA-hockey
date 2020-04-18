import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieStatsTableComponent } from './goalie-stats-table.component';

describe('GoalieStatsTableComponent', () => {
  let component: GoalieStatsTableComponent;
  let fixture: ComponentFixture<GoalieStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieStatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
