import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersDetailArchivesComponent } from './players-detail-archives.component';

describe('PlayersDetailArchivesComponent', () => {
  let component: PlayersDetailArchivesComponent;
  let fixture: ComponentFixture<PlayersDetailArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersDetailArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersDetailArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
