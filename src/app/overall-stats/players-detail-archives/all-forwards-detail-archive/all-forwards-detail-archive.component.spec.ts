import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllForwardsDetailArchiveComponent } from './all-forwards-detail-archive.component';

describe('AllForwardsDetailArchiveComponent', () => {
  let component: AllForwardsDetailArchiveComponent;
  let fixture: ComponentFixture<AllForwardsDetailArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllForwardsDetailArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllForwardsDetailArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
