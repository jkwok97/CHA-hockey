import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTeamTotalsComponent } from './current-team-totals.component';

describe('CurrentTeamTotalsComponent', () => {
  let component: CurrentTeamTotalsComponent;
  let fixture: ComponentFixture<CurrentTeamTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTeamTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTeamTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
