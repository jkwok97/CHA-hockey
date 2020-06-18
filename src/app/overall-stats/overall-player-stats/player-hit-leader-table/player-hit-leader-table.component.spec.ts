import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerHitLeaderTableComponent } from './player-hit-leader-table.component';

describe('PlayerHitLeaderTableComponent', () => {
  let component: PlayerHitLeaderTableComponent;
  let fixture: ComponentFixture<PlayerHitLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerHitLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerHitLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
