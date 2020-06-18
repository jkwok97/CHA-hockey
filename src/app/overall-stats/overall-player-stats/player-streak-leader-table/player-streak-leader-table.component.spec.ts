import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStreakLeaderTableComponent } from './player-streak-leader-table.component';

describe('PlayerStreakLeaderTableComponent', () => {
  let component: PlayerStreakLeaderTableComponent;
  let fixture: ComponentFixture<PlayerStreakLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerStreakLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStreakLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
