import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardTableViewComponent } from './award-table-view.component';

describe('AwardTableViewComponent', () => {
  let component: AwardTableViewComponent;
  let fixture: ComponentFixture<AwardTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
