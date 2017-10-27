import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { PouchDbService } from '../services/pouch-db.service';
import { DatastoreService } from '../services/datastore.service';
import { PlaylistService } from '../services/playlist.service';
import { AutoplayService } from '../services/autoplay.service';
import * as id3 from 'id3js';
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
  private fileType = 'audio.*';
  private fileCntr = 1;
  private mainLibrary: Playlist;
  private playLists: Array<Playlist> = new Array();
  private playlistName: string;
  public autoPlaylists: Array<Track> = new Array(); 
  selTab = 0;
  queueLength = 0;
  constructor(private dbservice: PouchDbService, private datastore: DatastoreService, private playlistService: PlaylistService,private autoPlayService: AutoplayService) { }

  ngOnInit() {
    this.loadPlaylists();
    this.autoPlayService.autoPlaylistSubject.subscribe((autoPlayQueue) => {
      this.autoPlaylists = autoPlayQueue;
      this.queueLength = this.autoPlaylists.length;
      console.log(this.autoPlaylists)
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
  
  private readFiles(inputValue: any): void {
    this.mainLibrary = this.playlistService.getMainLibrary();
    this.fileCntr = Number(this.mainLibrary.trackCount) + 1;
    const files = inputValue.files;

    for (const file of files) {
      if (file.type.match(this.fileType)) {
        const reader = new FileReader();

        reader.onload = function (e) {
        };
        const track = new Track(file.name);
        // reader.readAsArrayBuffer(file);
        reader.readAsDataURL(file);

        id3(file, (err, tags) => {
            if (err) {
              console.log(err);
            } else {
              console.log(tags)
              if(tags.title){
                track.name = tags.title
              } else{
                track.name = file.name.replace(/\.[^/.]+$/, "")
              }             
              track.artist = tags.artist
            }       
        });
        
        track.trackNumber = this.fileCntr;
        track.source = 'local';
        track.link = file.path;

        this.fileCntr++;
        console.log(this.mainLibrary.tracks);
        this.mainLibrary.tracks.push(track);

      }


    }
    this.mainLibrary.trackCount = this.mainLibrary.tracks.length;
    this.datastore.addTrack(this.mainLibrary.tracks);
    this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');
  }

  changeListener($event): void {
    this.readFiles($event.target);
  }

 
}
