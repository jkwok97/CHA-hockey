import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationPlayerTableComponent } from './player-information-player-table.component';

describe('PlayerInformationPlayerTableComponent', () => {
  let component: PlayerInformationPlayerTableComponent;
  let fixture: ComponentFixture<PlayerInformationPlayerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationPlayerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationPlayerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
