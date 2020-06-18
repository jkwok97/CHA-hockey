import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLongStreakLeaderTableComponent } from './player-long-streak-leader-table.component';

describe('PlayerLongStreakLeaderTableComponent', () => {
  let component: PlayerLongStreakLeaderTableComponent;
  let fixture: ComponentFixture<PlayerLongStreakLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLongStreakLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLongStreakLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
