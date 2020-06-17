import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerGoalsComponent } from './team-player-goals.component';

describe('TeamPlayerGoalsComponent', () => {
  let component: TeamPlayerGoalsComponent;
  let fixture: ComponentFixture<TeamPlayerGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
