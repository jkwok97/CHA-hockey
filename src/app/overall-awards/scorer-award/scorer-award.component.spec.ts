import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorerAwardComponent } from './scorer-award.component';

describe('ScorerAwardComponent', () => {
  let component: ScorerAwardComponent;
  let fixture: ComponentFixture<ScorerAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorerAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorerAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
