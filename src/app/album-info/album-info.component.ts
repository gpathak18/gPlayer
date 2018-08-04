import { Component, OnInit, Input } from '@angular/core';
import { PouchDbService } from '../services/pouch-db.service';
import { Album } from '../album';
import { Track } from '../track';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css']
})
export class AlbumInfoComponent implements OnInit {

  @Input('album') album: any = '';

  private tracks: Array<Track>;

  
  constructor(
    private dbservice: PouchDbService
  ) { }

  ngOnInit() {
    this.tracks = this.album.tracks;
    console.log("album tracks", this.tracks)
  }

  playSong(event) {
    event.stopPropagation();
  }

}
