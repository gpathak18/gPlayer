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
 @Input('selectedTab') tabIndex;
 @Output() playEvent = new EventEmitter();

  private displayedColumns = ['TrackNumber', 'Name', 'Link', 'Source'];
  private dataSource: DatastoreService | null;
  private hoverrow = -1;
  private tracks: Array<Track>;
  private selectedRowIndex = -1;
  private userPlaylists: Array<Playlist>;
  private selectedTrack: any;
  // selectedIndex = this.ta;

  constructor(private playlistService: PlaylistService, private datastore: DatastoreService, public snackBar: MatSnackBar) {
  }

  openSnackBar(plslst: Playlist, action: string) {

    const theTrack = new Track(this.selectedTrack.Name);
    theTrack.trackNumber = this.selectedTrack.TrackNumber;
    theTrack.link = this.selectedTrack.Link;
    theTrack.source = this.selectedTrack.Source;
 

    this.playlistService.addToPlaylist(theTrack, plslst).then((result) => {
      this.showConfirmMessage('Track Added');
    }).catch((error) => {
      console.log('error', error);
      this.showConfirmMessage('Could not add track');
    });
  }

  private showConfirmMessage(msg) {
    this.snackBar.open(msg, 'Done', {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.dataSource = this.datastore;
    this.winWdHt.tileHeight = '560';
    this.winWdHt.tileWidth = '500';
    this.playlistService.user_playlists.subscribe(value => this.userPlaylists = value);
    this.dataSource.currentTracks.subscribe(tracks => this.tracks = tracks);
  }

  // ngOnChanges(){
  //   console.log(this.tabIndex);
  //   // this.selectedIndex = this.tabIndex;
  // }

  private setSelectedTrack(_track) {
    this.selectedTrack = _track;
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
