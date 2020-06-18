import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLeaderCardComponent } from './player-leader-card.component';

describe('PlayerLeaderCardComponent', () => {
  let component: PlayerLeaderCardComponent;
  let fixture: ComponentFixture<PlayerLeaderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLeaderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
