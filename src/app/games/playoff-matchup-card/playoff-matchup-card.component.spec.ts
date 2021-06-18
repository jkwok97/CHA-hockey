import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffMatchupCardComponent } from './playoff-matchup-card.component';

describe('PlayoffMatchupCardComponent', () => {
  let component: PlayoffMatchupCardComponent;
  let fixture: ComponentFixture<PlayoffMatchupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffMatchupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffMatchupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
