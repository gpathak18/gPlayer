import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyPlaylistsComponent } from './player-body-playlists.component';

describe('PlayerBodyPlaylistsComponent', () => {
  let component: PlayerBodyPlaylistsComponent;
  let fixture: ComponentFixture<PlayerBodyPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
