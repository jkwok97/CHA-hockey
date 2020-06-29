import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTeamCardComponent } from './game-team-card.component';

describe('GameTeamCardComponent', () => {
  let component: GameTeamCardComponent;
  let fixture: ComponentFixture<GameTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
