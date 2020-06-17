import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerPlusMinusComponent } from './team-player-plus-minus.component';

describe('TeamPlayerPlusMinusComponent', () => {
  let component: TeamPlayerPlusMinusComponent;
  let fixture: ComponentFixture<TeamPlayerPlusMinusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerPlusMinusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerPlusMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
