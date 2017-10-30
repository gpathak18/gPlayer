import { Component, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from 'events';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { PlaylistService } from '../services/playlist.service';
import { AutoplayService } from '../services/autoplay.service';
import { FilehandlingService } from '../services/filehandling.service';
import * as fs from 'fs';
import Utility from '../Utility';
import { Observable } from 'rxjs';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-player-body-header',
  templateUrl: './player-body-header.component.html',
  styleUrls: ['./player-body-header.component.css']
})
export class PlayerBodyHeaderComponent implements OnInit {

  @Input('emptyQueue') isQueueEmpty;
  @ViewChild('filter') filter: ElementRef;
  
  private playlistname = '';
  private selectedTracks: Array<Track> = new Array();
  private mainLibrary: Playlist;
  private playLists: Array<Playlist> = new Array();
  private playlistName: string;
  public autoPlaylists: Array<Track> = new Array(); 
  private selTab = 0;
  private queueLength = 0;
  private dataSource: DatastoreService | null;

  constructor(
    private playlistService: PlaylistService,
    private autoPlayService: AutoplayService,
    private fileHandlingSerice: FilehandlingService,
    private datastore: DatastoreService
  ) { 

  }

  ngOnInit() {
    this.dataSource = this.datastore;
    this.loadPlaylists();
    this.autoPlayService.autoPlaylistSubject.subscribe((autoPlayQueue) => {
      this.autoPlaylists = autoPlayQueue;
      this.queueLength = this.autoPlaylists.length;
    });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(10)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { 
        return; 
      }
      this.dataSource.filter = this.filter.nativeElement.value;
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
