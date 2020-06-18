import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAssistLeaderTableComponent } from './player-assist-leader-table.component';

describe('PlayerAssistLeaderTableComponent', () => {
  let component: PlayerAssistLeaderTableComponent;
  let fixture: ComponentFixture<PlayerAssistLeaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAssistLeaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAssistLeaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
