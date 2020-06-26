import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationCardComponent } from './player-information-card.component';

describe('PlayerInformationCardComponent', () => {
  let component: PlayerInformationCardComponent;
  let fixture: ComponentFixture<PlayerInformationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
