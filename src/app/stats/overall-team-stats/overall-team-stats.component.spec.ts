import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallTeamStatsComponent } from './overall-team-stats.component';

describe('OverallTeamStatsComponent', () => {
  let component: OverallTeamStatsComponent;
  let fixture: ComponentFixture<OverallTeamStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallTeamStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallTeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
