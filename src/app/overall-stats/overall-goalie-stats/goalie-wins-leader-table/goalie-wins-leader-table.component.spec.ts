import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieWinsLeaderTableComponent } from './goalie-wins-leader-table.component';

describe('GoalieWinsLeaderTableComponent', () => {
  let component: GoalieWinsLeaderTableComponent;
  let fixture: ComponentFixture<GoalieWinsLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieWinsLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieWinsLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
