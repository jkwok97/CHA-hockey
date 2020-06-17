import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerPpGoalsComponent } from './team-player-pp-goals.component';

describe('TeamPlayerPpGoalsComponent', () => {
  let component: TeamPlayerPpGoalsComponent;
  let fixture: ComponentFixture<TeamPlayerPpGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerPpGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerPpGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
