import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftOverallComponent } from './draft-overall.component';

describe('DraftOverallComponent', () => {
  let component: DraftOverallComponent;
  let fixture: ComponentFixture<DraftOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
