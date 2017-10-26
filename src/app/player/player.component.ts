'use strict';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import Utility from '../Utility';
import { MatDialog } from '@angular/material';
import { EqualizerComponent } from '../equalizer/equalizer.component';
import { Observable } from 'rxjs/Observable';
import { AutoplayService } from '../services/autoplay.service';



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

  private songName: string = "Beat It"
  private artist: string = "Michael Jackson"
  private zoomState = 'zoomOut'
  private playPauseState = 'pause'
  private volumeIcon = 'volume_up'
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
    backend: 'WebAudio',
    autoCenter: true
  };

  private zoomValue;
  private zoomMin;

  @ViewChild('volume') volume: ElementRef;
  private filters;
  private bassFilter;

  private EQ = [
    {
      f: 32,
      type: 'lowshelf'
    }, {
      f: 64,
      type: 'peaking'
    }, {
      f: 125,
      type: 'peaking'
    }, {
      f: 250,
      type: 'peaking'
    }, {
      f: 500,
      type: 'peaking'
    }, {
      f: 1000,
      type: 'peaking'
    }, {
      f: 2000,
      type: 'peaking'
    }, {
      f: 4000,
      type: 'peaking'
    }, {
      f: 8000,
      type: 'peaking'
    }, {
      f: 16000,
      type: 'highshelf'
    }
  ];

  constructor(public dialog: MatDialog, private autoPlayService: AutoplayService) { }

  ngOnInit() {

    this.player = new WaveSurfer(this.options);
    this.player.init();
    this.player.createBackend();
    // this.player.load('/assets/sample.mp3');
    this.setupPlayerEvents();
    this.setupPlayerEqFilters();
    this.player.setVolume(70/100)
 
  }

  private setupPlayerEqFilters(){

    this.filters = this.EQ.map( (band) => {
      var filter = this.player.backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });

    this.player.backend.setFilters(this.filters);

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

    this.player.on('finish', () => {
      this.playPauseState = 'pause'
      this.setPalyPauseIcon();
      this.autoPlayService.dequeueTrackAfterPlay();     
    });
    

    this.player.on('stop', () => {
      this.playPauseState = 'pause'
      this.setPalyPauseIcon();
    });
  }

  updateVolume($event){
    let value = $event.value

    if(value === 0){
      this.volumeIcon = 'volume_mute'
    }else if(value < 50){
      this.volumeIcon = 'volume_down'
    }else{
      this.volumeIcon = 'volume_up'
    }

    this.player.setVolume($event.value/100)
  }

 private  openDialog() {
    this.dialog.open(EqualizerComponent, {
      width: '480px',
      data: { filters: this.filters },
    });
  }

  private toggleZoomState() {
    this.zoomState = this.zoomState === 'zoomIn' ? 'zoomOut' : 'zoomIn';
    if(this.zoomState === 'zoomIn'){
      this.player.zoom(1)
    } else {
      this.player.zoom(20)
    }
  }
 
  private setPalyPauseIcon(){
    if (this.playPauseState === 'play') {
      this.icon = 'pause';
    } else {
      this.icon = 'play_arrow';
    }
  }

  private togglePlayPauseState(){
    this.playPauseState = this.playPauseState === 'play' ? 'pause' : 'play';
    this.setPalyPauseIcon();
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
