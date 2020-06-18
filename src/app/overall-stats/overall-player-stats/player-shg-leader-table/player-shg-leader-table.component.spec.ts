import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShgLeaderTableComponent } from './player-shg-leader-table.component';

describe('PlayerShgLeaderTableComponent', () => {
  let component: PlayerShgLeaderTableComponent;
  let fixture: ComponentFixture<PlayerShgLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShgLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShgLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
