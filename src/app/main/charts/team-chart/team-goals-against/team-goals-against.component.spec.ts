import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGoalsAgainstComponent } from './team-goals-against.component';

describe('TeamGoalsAgainstComponent', () => {
  let component: TeamGoalsAgainstComponent;
  let fixture: ComponentFixture<TeamGoalsAgainstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGoalsAgainstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGoalsAgainstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
