import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDefenseSalariesComponent } from './current-defense-salaries.component';

describe('CurrentDefenseSalariesComponent', () => {
  let component: CurrentDefenseSalariesComponent;
  let fixture: ComponentFixture<CurrentDefenseSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDefenseSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDefenseSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
