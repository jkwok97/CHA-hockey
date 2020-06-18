import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPpgLeaderTableComponent } from './player-ppg-leader-table.component';

describe('PlayerPpgLeaderTableComponent', () => {
  let component: PlayerPpgLeaderTableComponent;
  let fixture: ComponentFixture<PlayerPpgLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPpgLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPpgLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
