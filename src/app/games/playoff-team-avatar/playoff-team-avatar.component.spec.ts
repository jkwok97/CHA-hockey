import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffTeamAvatarComponent } from './playoff-team-avatar.component';

describe('PlayoffTeamAvatarComponent', () => {
  let component: PlayoffTeamAvatarComponent;
  let fixture: ComponentFixture<PlayoffTeamAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffTeamAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffTeamAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
