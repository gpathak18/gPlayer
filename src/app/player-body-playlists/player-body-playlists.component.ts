import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { PlaylistService } from '../services/playlist.service';
import Utility from '../Utility';
import { AutoplayService } from '../services/autoplay.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-body-playlists',
  templateUrl: './player-body-playlists.component.html',
  styleUrls: ['./player-body-playlists.component.css']
})
export class PlayerBodyPlaylistsComponent implements OnInit {

  @Input('winWdHt') winWdHt  = { tileHeight: '', tileWidth: ''};
  private playLists: Array<Playlist> = new Array();
  private currentTracks: Array<Track>;
  step = 0;
  private noimage = 'assets/png/no-image.png';

  constructor(
    private playlistService: PlaylistService,
    private autoplayService: AutoplayService,
    private playerService: PlayerService
  ) { }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.loadPlaylists();
  }

  private loadPlaylists() {
    this.playlistService.user_playlists.subscribe(value => this.playLists = value);
  }

  private truncateString(str,len){
    return Utility.truncateString(str,len);
  }
  
  private selectedPlylst($event) {
    const id = $event.currentTarget.id;
    const plylist : any = this.playLists.find((value: any) => value.Name === id);
    this.currentTracks = plylist.Tracks;
    console.log(id);
  }

  private playPlaylist($event) {
    const id = $event.currentTarget.id;
    const plylist : any = this.playLists.find((value: any) => value.Name === id);
    this.autoplayService.updateAutoPlaylist(plylist.Tracks)
    this.playerService.playNow(this.autoplayService.getTrackToPlay());
  }

  @ViewChild('volume') volume: ElementRef;
  
}
