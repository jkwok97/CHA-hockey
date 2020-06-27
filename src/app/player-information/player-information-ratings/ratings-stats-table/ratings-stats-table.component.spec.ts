import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsStatsTableComponent } from './ratings-stats-table.component';

describe('RatingsStatsTableComponent', () => {
  let component: RatingsStatsTableComponent;
  let fixture: ComponentFixture<RatingsStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsStatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
