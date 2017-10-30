import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import { PlayerComponent } from '../player/player.component';
import { Subject } from 'rxjs';
import { Track } from '../track';
import { AutoplayService } from './autoplay.service';


@Injectable()
export class PlayerService {

  public nowPlaying = new Subject<Track>();
  public playPause = new Subject();
  
  constructor(
    private autoPlayService: AutoplayService
  ) {

  }

  public playNow(track) {
    this.nowPlaying.next(track);
  }

  public play() {
    this.playPause.next('play');
  }

  public pause() {
    this.playPause.next('pause');
  }

  public playNext() {
    let track = this.autoPlayService.getTrackToPlay();
    if(track){
        this.playNow(track);
    }else {
      this.playPause.next('pause');
    }
  }

  public  playPrevious() {
    let track = this.autoPlayService.getPreviousTrackToPlay();
    if(track){
        this.playNow(track);
    }else {
        this.playPause.next('pause');
    }
  } 

}
