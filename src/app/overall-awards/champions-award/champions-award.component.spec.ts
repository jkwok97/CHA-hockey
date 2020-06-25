import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsAwardComponent } from './champions-award.component';

describe('ChampionsAwardComponent', () => {
  let component: ChampionsAwardComponent;
  let fixture: ComponentFixture<ChampionsAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionsAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
