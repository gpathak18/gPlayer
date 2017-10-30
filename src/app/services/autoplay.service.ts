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

  public updateAutoPlaylist(tracks){
    this.autoPlaylistSubject.next(tracks);
  }

  public addPlayNext(track) {
    this.autoPlaylists.unshift(track);
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  public addToQueue(track) {
    this.autoPlaylists.push(track);
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  public clearQueue(){
    this.autoPlaylists.length = 0;
    this.updateAutoPlaylist(this.autoPlaylists);
  }

  public getTrackToPlay(){
    let track = this.autoPlaylists.shift();
    if(track){
      this.autoPlaylists.push(track);      
    }
    this.updateAutoPlaylist(this.autoPlaylists);
    return track;
  }

  public getPreviousTrackToPlay(){
    let track = this.autoPlaylists.pop();
    this.autoPlaylists.unshift(track);
    this.updateAutoPlaylist(this.autoPlaylists);
    return track;
  }

  public dequeueTrackAtIndex(id) {
     this.autoPlaylists = this.autoPlaylists.filter((track:any) => track._Id != id)
     this.updateAutoPlaylist(this.autoPlaylists);
  }

}
