import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTradeCardComponent } from './team-trade-card.component';

describe('TeamTradeCardComponent', () => {
  let component: TeamTradeCardComponent;
  let fixture: ComponentFixture<TeamTradeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTradeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTradeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
