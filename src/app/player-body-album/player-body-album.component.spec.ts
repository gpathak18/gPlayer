import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyAlbumComponent } from './player-body-album.component';

describe('PlayerBodyAlbumComponent', () => {
  let component: PlayerBodyAlbumComponent;
  let fixture: ComponentFixture<PlayerBodyAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
