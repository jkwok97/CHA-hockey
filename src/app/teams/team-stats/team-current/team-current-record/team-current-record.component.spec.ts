import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCurrentRecordComponent } from './team-current-record.component';

describe('TeamCurrentRecordComponent', () => {
  let component: TeamCurrentRecordComponent;
  let fixture: ComponentFixture<TeamCurrentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCurrentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCurrentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
