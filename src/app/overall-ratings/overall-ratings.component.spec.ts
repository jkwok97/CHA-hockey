import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRatingsComponent } from './overall-ratings.component';

describe('OverallRatingsComponent', () => {
  let component: OverallRatingsComponent;
  let fixture: ComponentFixture<OverallRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
