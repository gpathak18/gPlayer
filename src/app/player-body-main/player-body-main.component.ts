'use strict';
import {PlaylistService} from '../playlist.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PouchDbService } from '../pouch-db.service';
import { DatastoreService } from '../datastore.service';
import { PlayerService } from '../player.service';
import { Track } from '../track';
import { Playlist } from '../playlist';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-player-body-main',
  templateUrl: './player-body-main.component.html',
  styleUrls: ['./player-body-main.component.css']
})
export class PlayerBodyMainComponent implements OnInit  {

 @Input('winWdHt') winWdHt  = { tileHeight: '', tileWidth: ''};
 @Input('player') player: any = '';

 @Output() playEvent = new EventEmitter();

  private displayedColumns = ['TrackNumber', 'Name', 'Link', 'Source'];
  private dataSource: DatastoreService | null;
  private hoverrow = -1;
  private tracks: Array<Track>;
  private selectedRowIndex = -1;
  private userPlaylists: Array<Playlist>;

  constructor(private playlistService: PlaylistService, private datastore: DatastoreService, public snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.dataSource = this.datastore;
    this.winWdHt.tileHeight = '560';
    this.winWdHt.tileWidth = '500';
    this.playlistService.user_playlists.subscribe(value => this.userPlaylists = value);
    this.dataSource.currentTracks.subscribe(tracks => this.tracks = tracks);
    console.log(this.userPlaylists);
  }

  private playTrack(row) {
    const path = this.getPath(row.TrackNumber)[0].link;
    this.player.loadTrack(path);
    this.player.loadTrack('/assets/sample.mp3');
  }

  private getPath(position) {
    return this.tracks.filter(track => {
      // track.trackNumber === position
    });
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('filter') filter: ElementRef;
}
