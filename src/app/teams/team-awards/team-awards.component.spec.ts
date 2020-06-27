import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAwardsComponent } from './team-awards.component';

describe('TeamAwardsComponent', () => {
  let component: TeamAwardsComponent;
  let fixture: ComponentFixture<TeamAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
