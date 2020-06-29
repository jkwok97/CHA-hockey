import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffTreeGamesComponent } from './playoff-tree-games.component';

describe('PlayoffTreeGamesComponent', () => {
  let component: PlayoffTreeGamesComponent;
  let fixture: ComponentFixture<PlayoffTreeGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffTreeGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffTreeGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
