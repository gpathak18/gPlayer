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
import { PlayerService } from '../services/player.service';



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

  private songName: string = ''
  private artist: string = ''
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
  private nowPlayingSong = ''
  private progress = 100;
  private isLoading = true;
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

  constructor(
    public dialog: MatDialog, 
    private autoPlayService: AutoplayService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {

    this.player = new WaveSurfer(this.options);
    this.player.init();
    this.player.createBackend();
    this.setupPlayerEvents();
    this.setupPlayerEqFilters();
    this.player.setVolume(70/100);

    this.playerService.nowPlaying.subscribe((track: any) => {
      this.player.load(track.Link); 
      this.songName = track.Name;
      this.artist = track.Artist;
      this.player.on('ready',this.player.play.bind(this.player));
      this.playerService.playPause.next('play');
      this.setPlayPuseIcon();  
    });

    this.playerService.playPause.subscribe((playPauseState: any) => {
      this.playPauseState = playPauseState;
      this.setPlayPuseIcon();     

      if(this.playPauseState === 'play') {
        this.player.play()
      } else if(this.playPauseState === 'pause') {
        this.player.pause()
      } else {
        this.player.stop()
      }

    });
 
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
      this.songDuration = Utility.formatTime(time);
    });

    this.player.on('pause', () => {
    });

    this.player.on('load', () => {
      let time = this.player.getDuration();
      this.songDuration = Utility.formatTime(time)
    });
    
    this.player.on('finish', () => {
      this.playerService.playNext();   
    });

    this.player.on('stop', () => {
    });

    this.player.on('loading', (a,b) => {
    });
   
  }

  private updateVolume($event){
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
 
  private setPlayPuseIcon(){
   this.icon = this.playPauseState === 'pause'? 'play_arrow': 'pause';
  }

  private togglePlayPauseState(){  
    if(this.playPauseState == 'play'){
      this.playerService.pause();   
    } else {
      this.playerService.play();   
    }
  }

  public onResize($event) {
    if (this.player.backend.buffer != null) {
      this.player.drawer.containerWidth = this.player.drawer.container.clientWidth;
      this.player.drawBuffer();
    }
  }

  // private onPause() {
  //   this.player.params.container.style.opacity = 0.8;
  //   this.player.pause();
  // }

  public stop() {
    this.player.stop();
  }

  private playNext(){
    this.playerService.playNext();   
  }

  private playPrevious(){
    this.playerService.playPrevious();   
  }

}
