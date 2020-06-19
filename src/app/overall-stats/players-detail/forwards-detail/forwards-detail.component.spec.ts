import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardsDetailComponent } from './forwards-detail.component';

describe('ForwardsDetailComponent', () => {
  let component: ForwardsDetailComponent;
  let fixture: ComponentFixture<ForwardsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
