import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGamesTableComponent } from './all-games-table.component';

describe('AllGamesTableComponent', () => {
  let component: AllGamesTableComponent;
  let fixture: ComponentFixture<AllGamesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGamesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGamesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
