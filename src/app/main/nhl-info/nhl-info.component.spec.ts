import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlInfoComponent } from './nhl-info.component';

describe('NhlInfoComponent', () => {
  let component: NhlInfoComponent;
  let fixture: ComponentFixture<NhlInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
