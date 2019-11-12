import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalTeamStatsComponent } from './historical-team-stats.component';

describe('HistoricalTeamStatsComponent', () => {
  let component: HistoricalTeamStatsComponent;
  let fixture: ComponentFixture<HistoricalTeamStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalTeamStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalTeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
