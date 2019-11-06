import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieArchivesComponent } from './goalie-archives.component';

describe('GoalieArchivesComponent', () => {
  let component: GoalieArchivesComponent;
  let fixture: ComponentFixture<GoalieArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
