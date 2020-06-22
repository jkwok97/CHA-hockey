import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCurrentSalaryComponent } from './team-current-salary.component';

describe('TeamCurrentSalaryComponent', () => {
  let component: TeamCurrentSalaryComponent;
  let fixture: ComponentFixture<TeamCurrentSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCurrentSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCurrentSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
