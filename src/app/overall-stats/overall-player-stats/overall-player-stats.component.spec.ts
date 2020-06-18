import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPlayerStatsComponent } from './overall-player-stats.component';

describe('OverallPlayerStatsComponent', () => {
  let component: OverallPlayerStatsComponent;
  let fixture: ComponentFixture<OverallPlayerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallPlayerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallPlayerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
