import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationStatsComponent } from './player-information-stats.component';

describe('PlayerInformationStatsComponent', () => {
  let component: PlayerInformationStatsComponent;
  let fixture: ComponentFixture<PlayerInformationStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
