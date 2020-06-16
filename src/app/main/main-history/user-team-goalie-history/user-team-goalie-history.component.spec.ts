import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamGoalieHistoryComponent } from './user-team-goalie-history.component';

describe('UserTeamGoalieHistoryComponent', () => {
  let component: UserTeamGoalieHistoryComponent;
  let fixture: ComponentFixture<UserTeamGoalieHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamGoalieHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamGoalieHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
