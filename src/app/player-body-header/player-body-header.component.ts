import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { PlaylistService } from '../services/playlist.service';
import { AutoplayService } from '../services/autoplay.service';
import { FilehandlingService } from '../services/filehandling.service';
import * as fs from 'fs';
import Utility from '../Utility';

@Component({
  selector: 'app-player-body-header',
  templateUrl: './player-body-header.component.html',
  styleUrls: ['./player-body-header.component.css']
})
export class PlayerBodyHeaderComponent implements OnInit {

  @Input('emptyQueue') isQueueEmpty;
  
  private playlistname = '';
  private selectedTracks: Array<Track> = new Array();
  
  private fileCntr = 1;
  private mainLibrary: Playlist;
  private playLists: Array<Playlist> = new Array();
  private playlistName: string;
  public autoPlaylists: Array<Track> = new Array(); 
  selTab = 0;
  queueLength = 0;

  constructor(
    private playlistService: PlaylistService,
    private autoPlayService: AutoplayService,
    private fileHandlingSerice: FilehandlingService
  ) { }

  ngOnInit() {
    this.loadPlaylists();
    this.autoPlayService.autoPlaylistSubject.subscribe((autoPlayQueue) => {
      this.autoPlaylists = autoPlayQueue;
      this.queueLength = this.autoPlaylists.length;
    });
  }

  setTab(tab) {
    this.selTab = tab;
  }

  private addPlaylist($event) {
    if (this.playlistname != null && this.playlistname.length > 0) {
      const plylst = new Playlist(this.playlistname);
      this.playlistService.createPlaylist(plylst);
      this.playlistname=""
    }
  }

  private addQueuePlaylist($event){
    if (this.playlistname != null && this.playlistname.length > 0) {
      const plylst = new Playlist(this.playlistname);
      plylst.tracks = this.autoPlaylists;
      this.playlistService.createPlaylist(plylst);
      this.playlistname=""
    }
  }

  private clearQueue(){
    this.autoPlayService.clearQueue();
  }

  private deletePlaylist($event) {
    this.playlistService.deletePlaylist($event.target.id);
  }

  private dequeueTrack($event) {
    this.autoPlayService.dequeueTrackAtIndex($event.target.id);
  }

  private loadPlaylists() {
    this.playlistService.user_playlists.subscribe(value => this.playLists = value);
  }

  private stopPropagation(event) {
    event.stopPropagation();
  }

  private truncateString(str){
    return Utility.truncateString(str,15);
  }

  private changeListener($event): void {
    this.fileHandlingSerice.readFiles($event.target.files)
  }
 
}
