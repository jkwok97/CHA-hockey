import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailArchivesComponent } from './team-detail-archives.component';

describe('TeamDetailArchivesComponent', () => {
  let component: TeamDetailArchivesComponent;
  let fixture: ComponentFixture<TeamDetailArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
