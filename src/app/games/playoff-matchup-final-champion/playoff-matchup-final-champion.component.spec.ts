import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffMatchupFinalChampionComponent } from './playoff-matchup-final-champion.component';

describe('PlayoffMatchupFinalChampionComponent', () => {
  let component: PlayoffMatchupFinalChampionComponent;
  let fixture: ComponentFixture<PlayoffMatchupFinalChampionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffMatchupFinalChampionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffMatchupFinalChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
