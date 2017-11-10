import {DatastoreService} from '../services/datastore.service';
import { AutoplayService } from '../services/autoplay.service';
import { PlaylistService } from '../services/playlist.service';
import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Track } from '../track';
import { Observable } from 'rxjs';
import Utility from '../Utility';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-player-body-album',
  templateUrl: './player-body-album.component.html',
  styleUrls: ['./player-body-album.component.css'],
  animations: [
    trigger('zindexStateTrigger', [
      state('false', style({
        zIndex: 11
      })),
      state('true', style({
        zIndex: 0
      })),
      transition('true => false', animate(1000)),
      transition('false => true', animate(1000)),
    ]),
    trigger('flipStateTrigger', [
      state('false', style({
        top: 'calc({{y}})',
        left: 'calc({{x}})',
        height: '460px',
        width: '400px',
        transform: 'rotateY(180deg) translate(0px,0px)',
        // position: 'absolute'
      }), {params: {x: '0px',y: '0px'}}),
      state('true', style({
        transform: 'rotateY(0)',
        // position: 'relative'
      })),
      transition('true => false',[animate('600ms cubic-bezier(0.19, 1, 0.22, 1)')]),
      transition('false => true',[animate('600ms cubic-bezier(0.23, 1, 0.32, 1)')]),
    ]),
    trigger('blurStateTrigger', [
      state('true', style({
        filter: 'blur(5px)'
      })),
      state('false', style({
        filter: 'blur(0px)'
      })),
      transition('true <=> false',animate('600ms cubic-bezier(0.23, 1, 0.32, 1)'))
    ])
  ]
})
export class PlayerBodyAlbumComponent implements OnInit {

  @Input('winWdHt') winWdHt  = { tileHeight: '', tileWidth: ''};
  // private dataSource: DatastoreService | null;
  private noimage = 'assets/png/no-image.png';
  private tracks: Array<Track>;
  private track;
  private albums: any;
  private isFlipped = false;
  thisstyle = '';

  constructor(  
    private playlistService: PlaylistService,
    private autoplayService: AutoplayService,
    private playerService: PlayerService,
    private datastore: DatastoreService,
    private sanitizer: DomSanitizer
    
  ) { }

  ngOnInit() {

    this.datastore.currentTracks.subscribe(addedTracks => {

      this.tracks = addedTracks;
      this.track = this.tracks[0]
      const source = Observable.from(this.tracks);
      console.log('here it is',this.tracks)
      
      this.albums = source

      .groupBy((track:any) => {
        track.Album;
        console.log('here it is',track)   
      })
      .flatMap(album => album.reduce((acc, curr) => [...acc, curr], []));

    });

    this.albums.subscribe(val => console.log(val));
  }


  private truncateString(str, len) {
    return Utility.truncateString(str, len);
  }

 x = '0px';
 y = '0px';
  isPositionO = false;
  private flippingStarted(ev,e){
    var viewportOffset = ev.element.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    // this.x = 5-left
    // this.y = top
    console.log('y',top-(top-5))
    console.log('x',left-(left-5))
    if(e){
      this.isPositionO = true;
    }  
  }

  private onClick(e,track){
    track.Selection = !track.Selection;
    this.isFlipped = track.Selection

    let viewportOffset = e.target.getBoundingClientRect();
    let top = viewportOffset.top;
    let left = viewportOffset.left;
    this.x = (50-left)+'px';
    this.y = (210-top)+'px';
  }
  private flippingDone(e){
    // var viewportOffset = ev.element.getBoundingClientRect();
    // // these are relative to the viewport, i.e. the window
    // var top = viewportOffset.top;
    // var left = viewportOffset.left;
    console.log(e)
    if(!e){
      this.isPositionO = false;
    }
    
  }

}
