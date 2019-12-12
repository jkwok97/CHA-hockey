import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlPlayersStatsComponent } from './nhl-players-stats.component';

describe('NhlPlayersStatsComponent', () => {
  let component: NhlPlayersStatsComponent;
  let fixture: ComponentFixture<NhlPlayersStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlPlayersStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlPlayersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
