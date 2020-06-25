import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonAwardComponent } from './season-award.component';

describe('SeasonAwardComponent', () => {
  let component: SeasonAwardComponent;
  let fixture: ComponentFixture<SeasonAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
