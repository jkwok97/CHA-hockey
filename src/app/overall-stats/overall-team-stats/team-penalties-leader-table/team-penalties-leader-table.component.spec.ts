import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPenaltiesLeaderTableComponent } from './team-penalties-leader-table.component';

describe('TeamPenaltiesLeaderTableComponent', () => {
  let component: TeamPenaltiesLeaderTableComponent;
  let fixture: ComponentFixture<TeamPenaltiesLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPenaltiesLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPenaltiesLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
