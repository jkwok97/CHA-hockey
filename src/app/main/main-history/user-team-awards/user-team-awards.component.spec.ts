import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamAwardsComponent } from './user-team-awards.component';

describe('UserTeamAwardsComponent', () => {
  let component: UserTeamAwardsComponent;
  let fixture: ComponentFixture<UserTeamAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
