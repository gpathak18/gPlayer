import {DatastoreService} from '../services/datastore.service';
import { AutoplayService } from '../services/autoplay.service';
import { PlaylistService } from '../services/playlist.service';
import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Track } from '../track';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-body-album',
  templateUrl: './player-body-album.component.html',
  styleUrls: ['./player-body-album.component.css']
})
export class PlayerBodyAlbumComponent implements OnInit {

  @Input('winWdHt') winWdHt  = { tileHeight: '', tileWidth: ''};
  // private dataSource: DatastoreService | null;
  private noimage = 'assets/png/no-image.png';
  private tracks: Array<Track>;
  private albums: any;

  constructor(  
    private playlistService: PlaylistService,
    private autoplayService: AutoplayService,
    private playerService: PlayerService,
    private datastore: DatastoreService,
    
  ) { }

  ngOnInit() {


    this.datastore.currentTracks.subscribe(addedTracks => {
      this.tracks = addedTracks;
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

}
