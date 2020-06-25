import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAwardsComponent } from './overall-awards.component';

describe('OverallAwardsComponent', () => {
  let component: OverallAwardsComponent;
  let fixture: ComponentFixture<OverallAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
