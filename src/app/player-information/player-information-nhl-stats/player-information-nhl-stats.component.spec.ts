import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationNhlStatsComponent } from './player-information-nhl-stats.component';

describe('PlayerInformationNhlStatsComponent', () => {
  let component: PlayerInformationNhlStatsComponent;
  let fixture: ComponentFixture<PlayerInformationNhlStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationNhlStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationNhlStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
