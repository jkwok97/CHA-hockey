import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieShotsFacedLeaderTableComponent } from './goalie-shots-faced-leader-table.component';

describe('GoalieShotsFacedLeaderTableComponent', () => {
  let component: GoalieShotsFacedLeaderTableComponent;
  let fixture: ComponentFixture<GoalieShotsFacedLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieShotsFacedLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieShotsFacedLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
