import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayoffTreeComponent } from './new-playoff-tree.component';

describe('NewPlayoffTreeComponent', () => {
  let component: NewPlayoffTreeComponent;
  let fixture: ComponentFixture<NewPlayoffTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlayoffTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayoffTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
