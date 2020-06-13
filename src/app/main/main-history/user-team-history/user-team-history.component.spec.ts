import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamHistoryComponent } from './user-team-history.component';

describe('UserTeamHistoryComponent', () => {
  let component: UserTeamHistoryComponent;
  let fixture: ComponentFixture<UserTeamHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
