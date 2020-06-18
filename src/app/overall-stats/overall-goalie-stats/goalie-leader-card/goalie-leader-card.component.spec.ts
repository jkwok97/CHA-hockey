import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieLeaderCardComponent } from './goalie-leader-card.component';

describe('GoalieLeaderCardComponent', () => {
  let component: GoalieLeaderCardComponent;
  let fixture: ComponentFixture<GoalieLeaderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieLeaderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieLeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
