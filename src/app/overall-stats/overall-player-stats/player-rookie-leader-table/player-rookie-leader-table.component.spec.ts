import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRookieLeaderTableComponent } from './player-rookie-leader-table.component';

describe('PlayerRookieLeaderTableComponent', () => {
  let component: PlayerRookieLeaderTableComponent;
  let fixture: ComponentFixture<PlayerRookieLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRookieLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRookieLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
