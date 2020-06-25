import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RookieAwardComponent } from './rookie-award.component';

describe('RookieAwardComponent', () => {
  let component: RookieAwardComponent;
  let fixture: ComponentFixture<RookieAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RookieAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RookieAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
