'use strict';
import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, Output, EventEmitter, HostListener } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Track } from '../track';
import { Playlist } from '../playlist';
import { MatSnackBar } from '@angular/material';
import { DatastoreService } from '../services/datastore.service';
import { PlaylistService } from '../services/playlist.service';
import { AutoplayService } from '../services/autoplay.service';
import Utility from '../Utility';
import { PlayerService } from '../services/player.service';
// import { shell } from 'electron';
declare const window: any;
const { shell } = window.require("electron").remote
@Component({
  selector: 'app-player-body-main',
  templateUrl: './player-body-main.component.html',
  styleUrls: ['./player-body-main.component.css']
})
export class PlayerBodyMainComponent implements OnInit {

  @Input('winWdHt') winWdHt = { tileHeight: '', tileWidth: '' };
  @Input('player') player: any = '';
  @Input('selectedTab') tabIndex;
  @Input('selectedRowIndex') selectedRowIndex = -1;
  @Output() playEvent = new EventEmitter();

  private displayedColumns = ['Position', 'Name', 'Selection', 'Options'];
  private dataSource: DatastoreService | null;
  private noimage = 'assets/png/no-image.png';
  private tracks: Array<Track>;
  private userPlaylists: Array<Playlist>;
  private selectedTrack: any;
  private nowPlayingTrackId: string;
  private stars: Array<string> = ['star_border','star_border','star_border','star_border','star_border']
  
  private play_circle_icon = 'play_circle_outline';
  private starResetCntr = 0;
  private shiftKeyFirstIndex = -1;  
  private emptyQueue = false;
  private isSelectAll=false;
  private isCheckAll = false;

  constructor(
    private autoPlayService: AutoplayService, 
    private playlistService: PlaylistService, 
    private datastore: DatastoreService, 
    public snackBar: MatSnackBar,
    private playerService: PlayerService
  ) {

  }

  private setSelection(track){
    console.log(track.Selection)
  }


  ngOnInit() {
    this.dataSource = this.datastore;
    this.winWdHt.tileHeight = '560';
    this.winWdHt.tileWidth = '500';

    this.playlistService.user_playlists.subscribe(value => this.userPlaylists = value);
    
    this.dataSource.currentTracks.subscribe(addedTracks => {
      this.tracks = addedTracks;
    });

    this.playerService.nowPlaying.subscribe((track: any) => {
        this.nowPlayingTrackId = track._Id;
        // this.clickRowIndex = track.Position;
    });

    this.playerService.playPause.subscribe((state: any) => {
      if(state === 'pause'){
        
      }
      // this.clickRowIndex = track.Position;
    });

  }

  private onFilesChange(fileList : FileList){
    console.log(fileList);
  }

  private setCheckAll(_isCheckAll){
    this.isCheckAll = _isCheckAll;
    this.tracks.map((track:any) => track.Selection = _isCheckAll); 
    // this.playlistService.updateMainLibrary(this.tracks); 
  }

  // handleDrop(e) {
  //   // this/e.target is current target element.
  //   e.stopPropagation(); // Stops some browsers from redirecting.
  //   e.preventDefault();
  //   var files = e.dataTransfer.files;
  //   for (var i = 0, f; f = files[i]; i++) {
  //     console.log(f)
  //   }
  //   return false;
  // }

  private setRating(i){
    this.stars = this.stars.map((star,index) => {
      if(index <= i){
          star = 'star'
      } else {
        star = 'star_border'
      }
      this.selectedTrack.Rating = i;
      return star;
    });
  }

  private resetRating(i){
    if(i===0 && this.starResetCntr === 1){
      this.stars[i] = this.stars[i] === 'star_border' ? 'star' : 'star_border';
      if(this.stars[0]==='star'){
        this.selectedTrack.Rating = 1;
      }else {
        this.selectedTrack.Rating = -1;
      }
      this.starResetCntr = 0;
    } else if(i===0) {
      this.starResetCntr++;
    }
  }

  private menuCloseEvent(){ 
    this.playlistService.updateMainLibrary(this.tracks); 
  }

  private openSnackBar(plslst: Playlist, action: string) {

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
      duration: 1000,
    });
  }

  private truncateString(str){
    return Utility.truncateString(str,Number(this.winWdHt.tileWidth)-465);
  }

  private openInFinder() {
    if(!shell.showItemInFolder(this.selectedTrack.Link)){
      this.showConfirmMessage('Could not open track in finder.');
    } 
  }
  
  private enqueueTrack(){
    this.autoPlayService.addToQueue(this.selectedTrack);
    this.emptyQueue = false;
  }

  private enqueuePlayNext(){
    this.autoPlayService.addPlayNext(this.selectedTrack);
  }

  private moveToTrash(){
       if(shell.moveItemToTrash(this.selectedTrack.Link)){
        this.showConfirmMessage('Track deleted.');
      } else {
        this.showConfirmMessage('Could not delete track.');
      }
      const _mainLibrary = this.playlistService.deleteFromMainLibrary(this.selectedTrack)
      this.datastore.addTrack(_mainLibrary.tracks);
  }

  private setSelectedTrack(_track) {
    this.selectedTrack = _track;
    this.setRating(_track.Rating);
  }

  private playTrack(row) {
    this.playerService.playNow(row)
    this.nowPlayingTrackId = row._Id;
  }

  private pauseTrack(){
    this.playerService.pause();
    this.nowPlayingTrackId = '';
  }

  private clickRowIndex = -1
  private handleRowClick(row, event){
    this.clickRowIndex = row.Position;
    this.isSelectAll=false;
    if(event.shiftKey) { 
      console.log('firest:', this.shiftKeyFirstIndex, 'last:', row.Position)    
      this.tracks.map((track:any) => {
        if(this.shiftKeyFirstIndex <  row.Position){
            if(track.Position >= this.shiftKeyFirstIndex && track.Position <= row.Position ){
              track.Selection = true;
            }
        }else{
          if(track.Position <= this.shiftKeyFirstIndex && track.Position >= row.Position ){
            track.Selection = true;
          }
        }
      });  
    } else {
      // this.tracks.map((track:any) => track.Selection = false);
    }
    this.shiftKeyFirstIndex = row.Position;
  }

  private toggleSelected(obj, event) {
    
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {     
    if (event.metaKey && event.keyCode == 65) {
      this.isSelectAll=true;
    }
  }

  @ViewChild('filter') filter: ElementRef;
}
