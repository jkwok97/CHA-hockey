import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRatingsComponent } from './team-ratings.component';

describe('TeamRatingsComponent', () => {
  let component: TeamRatingsComponent;
  let fixture: ComponentFixture<TeamRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
