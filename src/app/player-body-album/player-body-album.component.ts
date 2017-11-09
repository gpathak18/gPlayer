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
  transition
} from '@angular/animations';
 
@Component({
  selector: 'app-player-body-album',
  templateUrl: './player-body-album.component.html',
  styleUrls: ['./player-body-album.component.css'],
  animations: [
    trigger('flipStateTrigger', [
      state('false', style({
        zindex: '10px',
        top: '10px',
        left: '-50px',
        height: '400px',
        width: '400px',
        transform: 'rotateY(180deg) translate(0px,0px)'
      })),
      state('true', style({
        transform: 'rotateY(0)'
      })),
      transition('true => false', animate('1s ease-out')),
      transition('false => true', animate('1s ease-in'))
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
  private isFlipped = true;

  constructor(  
    private playlistService: PlaylistService,
    private autoplayService: AutoplayService,
    private playerService: PlayerService,
    private datastore: DatastoreService,
    
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

  private flippingDone(e){
    console.log(e)
  }
}
