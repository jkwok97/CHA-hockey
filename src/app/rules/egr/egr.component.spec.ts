import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgrComponent } from './egr.component';

describe('EgrComponent', () => {
  let component: EgrComponent;
  let fixture: ComponentFixture<EgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
