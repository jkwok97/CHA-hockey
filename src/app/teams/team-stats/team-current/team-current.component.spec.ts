import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCurrentComponent } from './team-current.component';

describe('TeamCurrentComponent', () => {
  let component: TeamCurrentComponent;
  let fixture: ComponentFixture<TeamCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
