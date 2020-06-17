import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGoalsForComponent } from './team-goals-for.component';

describe('TeamGoalsForComponent', () => {
  let component: TeamGoalsForComponent;
  let fixture: ComponentFixture<TeamGoalsForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGoalsForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGoalsForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
