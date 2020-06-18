import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShotLeaderTableComponent } from './player-shot-leader-table.component';

describe('PlayerShotLeaderTableComponent', () => {
  let component: PlayerShotLeaderTableComponent;
  let fixture: ComponentFixture<PlayerShotLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShotLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShotLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
