import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayersDetailArchiveComponent } from './all-players-detail-archive.component';

describe('AllPlayersDetailArchiveComponent', () => {
  let component: AllPlayersDetailArchiveComponent;
  let fixture: ComponentFixture<AllPlayersDetailArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlayersDetailArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayersDetailArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
