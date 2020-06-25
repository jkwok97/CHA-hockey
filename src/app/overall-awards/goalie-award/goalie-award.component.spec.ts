import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieAwardComponent } from './goalie-award.component';

describe('GoalieAwardComponent', () => {
  let component: GoalieAwardComponent;
  let fixture: ComponentFixture<GoalieAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
