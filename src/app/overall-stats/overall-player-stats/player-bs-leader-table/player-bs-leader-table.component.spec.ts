import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBsLeaderTableComponent } from './player-bs-leader-table.component';

describe('PlayerBsLeaderTableComponent', () => {
  let component: PlayerBsLeaderTableComponent;
  let fixture: ComponentFixture<PlayerBsLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBsLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBsLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
