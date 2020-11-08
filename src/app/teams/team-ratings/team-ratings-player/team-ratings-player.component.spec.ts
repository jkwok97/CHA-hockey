import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRatingsPlayerComponent } from './team-ratings-player.component';

describe('TeamRatingsPlayerComponent', () => {
  let component: TeamRatingsPlayerComponent;
  let fixture: ComponentFixture<TeamRatingsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRatingsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRatingsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
