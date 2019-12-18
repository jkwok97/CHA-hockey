import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSalaryComponent } from './team-salary.component';

describe('TeamSalaryComponent', () => {
  let component: TeamSalaryComponent;
  let fixture: ComponentFixture<TeamSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
