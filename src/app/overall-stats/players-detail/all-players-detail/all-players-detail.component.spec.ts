import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayersDetailComponent } from './all-players-detail.component';

describe('AllPlayersDetailComponent', () => {
  let component: AllPlayersDetailComponent;
  let fixture: ComponentFixture<AllPlayersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlayersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
