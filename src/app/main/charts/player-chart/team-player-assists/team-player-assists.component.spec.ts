import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerAssistsComponent } from './team-player-assists.component';

describe('TeamPlayerAssistsComponent', () => {
  let component: TeamPlayerAssistsComponent;
  let fixture: ComponentFixture<TeamPlayerAssistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerAssistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerAssistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
