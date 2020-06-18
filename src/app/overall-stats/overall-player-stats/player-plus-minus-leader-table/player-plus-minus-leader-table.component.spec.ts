import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPlusMinusLeaderTableComponent } from './player-plus-minus-leader-table.component';

describe('PlayerPlusMinusLeaderTableComponent', () => {
  let component: PlayerPlusMinusLeaderTableComponent;
  let fixture: ComponentFixture<PlayerPlusMinusLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPlusMinusLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPlusMinusLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
