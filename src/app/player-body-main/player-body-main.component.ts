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
  private defaultPlaylist: Playlist = {
    "TrackCount": 0,
    "UserIsOwner": true,
    "IsHidden": true,
    "CollectionStateToken": '0.0.0.1',
    "Tracks": {
      "Items": [this.defaulttrack],
      "TotalItemCount": 0
    },
    "_id": '',
    "Name": 'defaultPlaylist',
    "Link": '',
  };

  constructor(private dbservice: PouchDbService,private datastore: DatastoreService) { 


  }

  ngOnInit() {
    this.dataSource = this.datastore;
    this.dataSource.currentTracks.subscribe(track => this.tracks = track);
    this.winWdHt.tileHeight = '560'
    this.winWdHt.tileWidth = '500' 
    this.loadDefaultPlaylist();
  }

  private loadDefaultPlaylist(){

    this.dbservice.get('DEFAULT_PLAYLIST').then( (doc) => {
      this.defaultPlaylist = doc;
      this.datastore.addTrack(this.defaultPlaylist.Tracks.Items)
    }).catch( (err) => {
      if(err.status === 404){
        this.dbservice.put(this.defaultPlaylist,'DEFAULT_PLAYLIST')
      }
    });

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
