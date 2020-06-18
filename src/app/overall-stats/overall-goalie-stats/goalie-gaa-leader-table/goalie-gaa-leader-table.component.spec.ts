import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieGaaLeaderTableComponent } from './goalie-gaa-leader-table.component';

describe('GoalieGaaLeaderTableComponent', () => {
  let component: GoalieGaaLeaderTableComponent;
  let fixture: ComponentFixture<GoalieGaaLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieGaaLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieGaaLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
