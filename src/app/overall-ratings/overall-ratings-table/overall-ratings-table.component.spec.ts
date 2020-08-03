import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRatingsTableComponent } from './overall-ratings-table.component';

describe('OverallRatingsTableComponent', () => {
  let component: OverallRatingsTableComponent;
  let fixture: ComponentFixture<OverallRatingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRatingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRatingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
