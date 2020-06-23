import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaliesDetailArchivesComponent } from './goalies-detail-archives.component';

describe('GoaliesDetailArchivesComponent', () => {
  let component: GoaliesDetailArchivesComponent;
  let fixture: ComponentFixture<GoaliesDetailArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoaliesDetailArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaliesDetailArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
