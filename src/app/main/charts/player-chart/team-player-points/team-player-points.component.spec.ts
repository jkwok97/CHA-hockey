import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerPointsComponent } from './team-player-points.component';

describe('TeamPlayerPointsComponent', () => {
  let component: TeamPlayerPointsComponent;
  let fixture: ComponentFixture<TeamPlayerPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
