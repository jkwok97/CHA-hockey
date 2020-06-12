import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlGoalieStatsComponent } from './nhl-goalie-stats.component';

describe('NhlGoalieStatsComponent', () => {
  let component: NhlGoalieStatsComponent;
  let fixture: ComponentFixture<NhlGoalieStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlGoalieStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlGoalieStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
