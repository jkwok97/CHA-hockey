import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlRookieStatsComponent } from './nhl-rookie-stats.component';

describe('NhlRookieStatsComponent', () => {
  let component: NhlRookieStatsComponent;
  let fixture: ComponentFixture<NhlRookieStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlRookieStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlRookieStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
