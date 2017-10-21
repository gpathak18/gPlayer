import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { Track } from '../track';

@Component({
  selector: 'app-player-body-playlists',
  templateUrl: './player-body-playlists.component.html',
  styleUrls: ['./player-body-playlists.component.css']
})
export class PlayerBodyPlaylistsComponent implements OnInit {

  @Input('winWdHt') winWdHt  = { tileHeight: '', tileWidth: ''};
  private playLists: Array<Playlist> = new Array();
  private currentTracks: Array<Track>;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.loadPlaylists();
  }

  private loadPlaylists() {
    // this.playlistService.user_playlists.subscribe(value => this.playLists.push(value));
    this.playlistService.user_playlists.subscribe(value => this.playLists = value);
  }


  private selectedPlylst($event) {
    const id = $event.currentTarget.id;
    const plylist : any= this.playLists.find((value: any) => value.Name === id);
    this.currentTracks = plylist.Tracks;
    console.log(id);
  }
}
