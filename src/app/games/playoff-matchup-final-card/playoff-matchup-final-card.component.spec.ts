import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffMatchupFinalCardComponent } from './playoff-matchup-final-card.component';

describe('PlayoffMatchupFinalCardComponent', () => {
  let component: PlayoffMatchupFinalCardComponent;
  let fixture: ComponentFixture<PlayoffMatchupFinalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffMatchupFinalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffMatchupFinalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
