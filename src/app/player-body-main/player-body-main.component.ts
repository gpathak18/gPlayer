import {PlaylistService} from '../playlist.service';
'use strict';
import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PouchDbService } from '../pouch-db.service';
import { Track } from '../Itarck';
import { DatastoreService } from '../datastore.service';
import { PlayerService } from '../player.service';
import { Playlist } from '../IPlaylist';


@Component({
  selector: 'app-player-body-main',
  templateUrl: './player-body-main.component.html',
  styleUrls: ['./player-body-main.component.css']
})
export class PlayerBodyMainComponent implements OnInit {

 @Input('winWdHt') winWdHt  = { tileHeight:'', tileWidth: ''};
 @Input('player') player: any = "";

 @Output() playEvent = new EventEmitter();

  private displayedColumns = ['TrackNumber', 'Name', 'Link', 'Source'];
  private dataSource: DatastoreService | null;
  private hoverrow: number = -1;
  private tracks : Array<Track>;
  private selectedRowIndex: number = -1;
  private defaulttrack : Track;
  private currentPlaylist: Playlist;

  constructor(private playlistService: PlaylistService,private datastore: DatastoreService) { 
    

  }

  ngOnInit() {
    this.dataSource = this.datastore;
    this.dataSource.currentTracks.subscribe(track => this.tracks = track);
    this.winWdHt.tileHeight = '560'
    this.winWdHt.tileWidth = '500' 
    this.playlistService.loadMainlibrary()
  }

  private playTrack(row){
    let path = this.getPath(row.TrackNumber)[0].Link;
    this.player.loadTrack(path);
    this.player.loadTrack('/assets/sample.mp3');
    
  }

  private getPath(position){
    return this.tracks.filter(track => track.TrackNumber === position);
  } 

  @ViewChild('filter') filter: ElementRef;
}
