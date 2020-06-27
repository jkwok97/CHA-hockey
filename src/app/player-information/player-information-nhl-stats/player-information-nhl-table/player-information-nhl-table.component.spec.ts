import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationNhlTableComponent } from './player-information-nhl-table.component';

describe('PlayerInformationNhlTableComponent', () => {
  let component: PlayerInformationNhlTableComponent;
  let fixture: ComponentFixture<PlayerInformationNhlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationNhlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationNhlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
