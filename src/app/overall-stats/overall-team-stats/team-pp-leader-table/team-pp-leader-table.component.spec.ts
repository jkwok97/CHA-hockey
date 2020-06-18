import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPpLeaderTableComponent } from './team-pp-leader-table.component';

describe('TeamPpLeaderTableComponent', () => {
  let component: TeamPpLeaderTableComponent;
  let fixture: ComponentFixture<TeamPpLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPpLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPpLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
