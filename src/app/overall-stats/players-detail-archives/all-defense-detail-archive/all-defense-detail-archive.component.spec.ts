import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDefenseDetailArchiveComponent } from './all-defense-detail-archive.component';

describe('AllDefenseDetailArchiveComponent', () => {
  let component: AllDefenseDetailArchiveComponent;
  let fixture: ComponentFixture<AllDefenseDetailArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDefenseDetailArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDefenseDetailArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
