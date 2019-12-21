import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffTreeComponent } from './playoff-tree.component';

describe('PlayoffTreeComponent', () => {
  let component: PlayoffTreeComponent;
  let fixture: ComponentFixture<PlayoffTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
