import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamArchivesComponent } from './team-archives.component';

describe('TeamArchivesComponent', () => {
  let component: TeamArchivesComponent;
  let fixture: ComponentFixture<TeamArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
