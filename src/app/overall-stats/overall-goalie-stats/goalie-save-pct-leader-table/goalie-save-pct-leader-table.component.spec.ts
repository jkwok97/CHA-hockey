import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieSavePctLeaderTableComponent } from './goalie-save-pct-leader-table.component';

describe('GoalieSavePctLeaderTableComponent', () => {
  let component: GoalieSavePctLeaderTableComponent;
  let fixture: ComponentFixture<GoalieSavePctLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieSavePctLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieSavePctLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
