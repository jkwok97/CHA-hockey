import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGoaliesSalariesComponent } from './current-goalies-salaries.component';

describe('CurrentGoaliesSalariesComponent', () => {
  let component: CurrentGoaliesSalariesComponent;
  let fixture: ComponentFixture<CurrentGoaliesSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentGoaliesSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGoaliesSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
