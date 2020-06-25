import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmAwardComponent } from './gm-award.component';

describe('GmAwardComponent', () => {
  let component: GmAwardComponent;
  let fixture: ComponentFixture<GmAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
