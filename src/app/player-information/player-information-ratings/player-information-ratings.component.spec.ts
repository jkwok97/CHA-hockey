import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationRatingsComponent } from './player-information-ratings.component';

describe('PlayerInformationRatingsComponent', () => {
  let component: PlayerInformationRatingsComponent;
  let fixture: ComponentFixture<PlayerInformationRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
