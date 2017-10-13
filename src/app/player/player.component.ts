'use strict';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import Utility from '../Utility';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    trigger('zoomState', [
      state('zoomOut',style({
        backgroundColor: '#ffffff'
      })),
      state('zoomIn',   style({
        backgroundColor: '#cfd8dc'
      })),
      transition('zoomOut <=> zoomIn', animate('100ms ease-in'))
    ])
  ]
})
export class PlayerComponent implements OnInit {

  private zoomState = 'zoomOut'
  private playPauseState = 'play'

  private icon = 'play_arrow';
  private player = null;
  private songDuration: string = '0:00';
  private currentTime: string = '0:00';
  private timeNow: string = '0:00';
  private isScroll: boolean = true;
  private options = {
    container: '#waveform',
    waveColor: 'hsla(245, 48%, 26%, 0.7)',
    height: 50,
    audioRate: 1,
    scrollParent: this.isScroll,
    hideScrollbar: true,
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'dimgrey',
    barWidth: 3,
    backend: 'MediaElement',
    autoCenter: true

  };

  private zoomValue;
  private zoomMin;

  constructor() { }

  ngOnInit() {

    this.player = new WaveSurfer(this.options);
    this.player.init();
    this.setupPlayerEvents();
    this.zoomValue = this.player.params.minPxPerSec;
    this.zoomMin = this.player.params.minPxPerSec;
    console.log(this.zoomValue,this.zoomMin )
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



  easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  }
 

  private toggleZoomState() {
    this.zoomState = this.zoomState === 'zoomIn' ? 'zoomOut' : 'zoomIn';

    if(this.zoomState === 'zoomIn'){
      for (var i = 1; i < 21; i++) {
        setTimeout(() => this.player.zoom(Number(i)), 1000);
      }
    } else {
      this.player.zoom(100)
    }
  }
 
  private togglePlayPauseState(){
    this.playPauseState = this.playPauseState === 'play' ? 'pause' : 'play';
    if (this.playPauseState === 'play') {
      this.icon = 'pause';
    } else {
      this.icon = 'play';
    }
    this.player.playPause();
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
