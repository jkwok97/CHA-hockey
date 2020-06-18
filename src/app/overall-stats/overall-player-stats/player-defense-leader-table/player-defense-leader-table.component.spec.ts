import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDefenseLeaderTableComponent } from './player-defense-leader-table.component';

describe('PlayerDefenseLeaderTableComponent', () => {
  let component: PlayerDefenseLeaderTableComponent;
  let fixture: ComponentFixture<PlayerDefenseLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDefenseLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDefenseLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
