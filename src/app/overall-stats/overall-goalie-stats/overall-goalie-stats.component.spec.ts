import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallGoalieStatsComponent } from './overall-goalie-stats.component';

describe('OverallGoalieStatsComponent', () => {
  let component: OverallGoalieStatsComponent;
  let fixture: ComponentFixture<OverallGoalieStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallGoalieStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallGoalieStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
