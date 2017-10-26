import {PlaylistService} from './playlist.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Track } from '../track';

@Injectable()
export class AutoplayService {

  public autoPlaylistSubject = new Subject<Array<Track>>(); 
  private autoPlaylists : Array<Track> = new Array();

  constructor() { 
    this.autoPlaylistSubject.subscribe((tracks) => this.autoPlaylists = tracks);
  }

  updateAutoPlaylist(tracks){
    this.autoPlaylistSubject.next(tracks);
  }

  addPlayNext(track) {
    this.autoPlaylists.unshift(track);
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  addToQueue(track) {
    this.autoPlaylists.push(track);
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  clearQueue(){
    this.autoPlaylists.length = 0;
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  getTrackToPlay(){
    return this.autoPlaylists[0];
  }

  dequeueTrackAfterPlay() {
    this.autoPlaylists.shift();
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  dequeueTrackAtIndex(id) {
     this.autoPlaylists = this.autoPlaylists.filter((track:any) => track.Name != id)
     this.updateAutoPlaylist(this.autoPlaylists);
  }

}
