import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGoalsDiffComponent } from './team-goals-diff.component';

describe('TeamGoalsDiffComponent', () => {
  let component: TeamGoalsDiffComponent;
  let fixture: ComponentFixture<TeamGoalsDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGoalsDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGoalsDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
