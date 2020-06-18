import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPenaltyLeaderTableComponent } from './player-penalty-leader-table.component';

describe('PlayerPenaltyLeaderTableComponent', () => {
  let component: PlayerPenaltyLeaderTableComponent;
  let fixture: ComponentFixture<PlayerPenaltyLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPenaltyLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPenaltyLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
