import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPkRankComponent } from './team-pk-rank.component';

describe('TeamPkRankComponent', () => {
  let component: TeamPkRankComponent;
  let fixture: ComponentFixture<TeamPkRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPkRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPkRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
