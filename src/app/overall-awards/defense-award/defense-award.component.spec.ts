import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseAwardComponent } from './defense-award.component';

describe('DefenseAwardComponent', () => {
  let component: DefenseAwardComponent;
  let fixture: ComponentFixture<DefenseAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenseAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenseAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
