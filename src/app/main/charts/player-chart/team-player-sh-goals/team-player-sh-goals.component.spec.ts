import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerShGoalsComponent } from './team-player-sh-goals.component';

describe('TeamPlayerShGoalsComponent', () => {
  let component: TeamPlayerShGoalsComponent;
  let fixture: ComponentFixture<TeamPlayerShGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerShGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerShGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
