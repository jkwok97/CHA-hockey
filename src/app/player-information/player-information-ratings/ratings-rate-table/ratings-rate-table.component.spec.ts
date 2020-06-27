import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsRateTableComponent } from './ratings-rate-table.component';

describe('RatingsRateTableComponent', () => {
  let component: RatingsRateTableComponent;
  let fixture: ComponentFixture<RatingsRateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsRateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsRateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
