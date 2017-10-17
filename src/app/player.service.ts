import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import { PlayerComponent } from './player/player.component';

@Injectable()
export class PlayerService {


  constructor(private playerComponent: PlayerComponent) {

  }

  public loadTrack(path: string) {
    this.playerComponent.loadTrack(path);
  }

  public play() {
    this.playerComponent.play();
  }

  public pause() {
    this.playerComponent.pause();
  }
   //this.player.on('ready', this.player.play.bind(this.player));

}
