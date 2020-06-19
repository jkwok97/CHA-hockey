import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaliesDetailComponent } from './goalies-detail.component';

describe('GoaliesDetailComponent', () => {
  let component: GoaliesDetailComponent;
  let fixture: ComponentFixture<GoaliesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoaliesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaliesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
