import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieShutoutLeaderTableComponent } from './goalie-shutout-leader-table.component';

describe('GoalieShutoutLeaderTableComponent', () => {
  let component: GoalieShutoutLeaderTableComponent;
  let fixture: ComponentFixture<GoalieShutoutLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieShutoutLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieShutoutLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
