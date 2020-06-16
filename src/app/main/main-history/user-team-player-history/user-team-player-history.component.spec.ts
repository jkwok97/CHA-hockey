import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamPlayerHistoryComponent } from './user-team-player-history.component';

describe('UserTeamPlayerHistoryComponent', () => {
  let component: UserTeamPlayerHistoryComponent;
  let fixture: ComponentFixture<UserTeamPlayerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeamPlayerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamPlayerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
