import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRatingsGoalieComponent } from './team-ratings-goalie.component';

describe('TeamRatingsGoalieComponent', () => {
  let component: TeamRatingsGoalieComponent;
  let fixture: ComponentFixture<TeamRatingsGoalieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRatingsGoalieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRatingsGoalieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
