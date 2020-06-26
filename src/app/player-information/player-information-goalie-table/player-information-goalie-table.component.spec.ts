import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationGoalieTableComponent } from './player-information-goalie-table.component';

describe('PlayerInformationGoalieTableComponent', () => {
  let component: PlayerInformationGoalieTableComponent;
  let fixture: ComponentFixture<PlayerInformationGoalieTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationGoalieTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationGoalieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
