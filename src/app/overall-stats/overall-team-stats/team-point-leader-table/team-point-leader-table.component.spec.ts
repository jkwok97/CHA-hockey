import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPointLeaderTableComponent } from './team-point-leader-table.component';

describe('TeamPointLeaderTableComponent', () => {
  let component: TeamPointLeaderTableComponent;
  let fixture: ComponentFixture<TeamPointLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPointLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPointLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
