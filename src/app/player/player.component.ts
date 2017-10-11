'use strict';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import Utility from '../Utility';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  
  private icon = 'play_arrow';
  private player = null;
  private songDuration: string = '0:00';
  private currentTime: string = '0:00';
  private timeNow: string = '0:00';
  private options = {
    container: '#waveform',
    waveColor: 'hsla(245, 48%, 26%, 0.7)',
    height: 50,
    audioRate: 1,
    scrollParent: true,
    hideScrollbar: true,
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'dimgrey',
    barWidth: 3,
    backend: 'MediaElement'

  };

  constructor() { }

  ngOnInit() {
    this.player = new WaveSurfer(this.options);
    this.player.init();
    this.player.load('/assets/sample.mp3');
  }

  private setupPlayerEvents() {

    this.player.on('audioprocess', time => {
      if (this.player.isPlaying()) {
        this.timeNow = Utility.formatTime(time)
      }
      this.currentTime = this.timeNow;
    });

    this.player.on('play', () => {
      let time = this.player.getDuration();
      this.songDuration = Utility.formatTime(time)
    });


  }

  public onResize($event) {
    if (this.player != null && this.player.drawer != null) {
      this.player.drawer.containerWidth = this.player.drawer.container.clientWidth;
      this.player.drawBuffer();
    }
  }

  private onReady() {

  }

  private onPause() {
    this.player.params.container.style.opacity = 0.9;
  }

  public play() {

    if (this.icon == 'pause') {
      this.icon = 'play_arrow';
    } else {
      this.icon = 'pause';
    }

    this.player.playPause();
  }

  public loadTrack(path: string) {
    console.log('path', path)
    this.player.load(path);
  }

  public pause() {
    this.player.pause();
  }

  public stop() {
    this.player.stop();
  }

  public playPause() {
    this.player.playPause();
  }



}
