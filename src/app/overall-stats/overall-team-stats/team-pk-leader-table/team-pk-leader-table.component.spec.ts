import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPkLeaderTableComponent } from './team-pk-leader-table.component';

describe('TeamPkLeaderTableComponent', () => {
  let component: TeamPkLeaderTableComponent;
  let fixture: ComponentFixture<TeamPkLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPkLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPkLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
