import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSummaryTableComponent } from './draft-summary-table.component';

describe('DraftSummaryTableComponent', () => {
  let component: DraftSummaryTableComponent;
  let fixture: ComponentFixture<DraftSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
