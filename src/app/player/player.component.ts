'use strict';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';


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

  private options = {
    container: '#waveform',
    waveColor: 'hsla(245, 48%, 26%, 0.7)',
    height: 50,
    audioRate: 1,
    scrollParent: true,
    hideScrollbar: true,
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'dimgrey',
    barWidth: 3
  };

  constructor() { }

  ngOnInit() {

    this.player = new WaveSurfer(this.options);
    this.player.init();
 
  }

  public onResize($event) {
    if (this.player != null && this.player.drawer != null) {
      this.player.drawer.containerWidth = this.player.drawer.container.clientWidth;
      this.player.drawBuffer();
    }
  }

  private onReady(){

  }

  private onPause(){
    this.player.params.container.style.opacity = 0.9;
  }

  private onAudioprocess(){
    this.songDuration = this.player.getDuration();
  }

  public play() {

    let logger = function(){
      console.log('hello',this.player)
    }

    if (this.icon == 'pause') {
      this.icon = 'play_arrow';
    } else {
      this.icon = 'pause';
    }
    this.player.on('audioprocess',logger())
    console.log();
    // this.player.on('audioprocess', function () {
    //   console.log("topaz",this.player)
    //   this.player.params.container.style.opacity = 0.9;
    // });
    // this.player.on('onReady', function () {

    //   this.player.params.container.style.opacity = 0.9;
    // });

    this.player.playPause();
    //   this.player.on('ready', function () {
    //     this.songDuration= formatTime(this.player.getDuration());
    //   });

    //  this.player.on('audioprocess', function () {
    //     this.currentTime = formatTime(this.getCurrentTime());
    //   });

  }

  public logger(){
    console.log('hello',this.player)
  }

  public loadTrack(path: string) {
    console.log('path',path)
    this.player.load(path);
  }

  public pause() {
    this.player.pause();
  }

  public stop() {
    this.player.stop();
  }

  public playPause(){
    this.player.playPause();
  }
 
  public formatTime = function (time) {
    return [
      Math.floor((time % 3600) / 60), // minutes
      ('00' + Math.floor(time % 60)).slice(-2) // seconds
    ].join(':');
  };
  

}



