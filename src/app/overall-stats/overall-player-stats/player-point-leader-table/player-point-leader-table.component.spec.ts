import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPointLeaderTableComponent } from './player-point-leader-table.component';

describe('PlayerPointLeaderTableComponent', () => {
  let component: PlayerPointLeaderTableComponent;
  let fixture: ComponentFixture<PlayerPointLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPointLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPointLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
