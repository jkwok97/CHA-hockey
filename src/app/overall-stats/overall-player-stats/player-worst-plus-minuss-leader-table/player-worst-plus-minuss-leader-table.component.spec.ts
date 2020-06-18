import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWorstPlusMinussLeaderTableComponent } from './player-worst-plus-minuss-leader-table.component';

describe('PlayerWorstPlusMinussLeaderTableComponent', () => {
  let component: PlayerWorstPlusMinussLeaderTableComponent;
  let fixture: ComponentFixture<PlayerWorstPlusMinussLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerWorstPlusMinussLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerWorstPlusMinussLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
