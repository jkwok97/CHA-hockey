import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerArchivesComponent } from './player-archives.component';

describe('PlayerArchivesComponent', () => {
  let component: PlayerArchivesComponent;
  let fixture: ComponentFixture<PlayerArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
