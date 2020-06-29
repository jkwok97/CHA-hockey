import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayGamesComponent } from './day-games.component';

describe('DayGamesComponent', () => {
  let component: DayGamesComponent;
  let fixture: ComponentFixture<DayGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
