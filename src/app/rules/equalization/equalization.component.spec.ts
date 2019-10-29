import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizationComponent } from './equalization.component';

describe('EqualizationComponent', () => {
  let component: EqualizationComponent;
  let fixture: ComponentFixture<EqualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
