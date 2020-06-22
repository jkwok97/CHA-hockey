import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentForwardSalariesComponent } from './current-forward-salaries.component';

describe('CurrentForwardSalariesComponent', () => {
  let component: CurrentForwardSalariesComponent;
  let fixture: ComponentFixture<CurrentForwardSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentForwardSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentForwardSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
