import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseDetailComponent } from './defense-detail.component';

describe('DefenseDetailComponent', () => {
  let component: DefenseDetailComponent;
  let fixture: ComponentFixture<DefenseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
