import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPpRankComponent } from './team-pp-rank.component';

describe('TeamPpRankComponent', () => {
  let component: TeamPpRankComponent;
  let fixture: ComponentFixture<TeamPpRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPpRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPpRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
