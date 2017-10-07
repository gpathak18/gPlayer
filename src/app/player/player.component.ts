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

  private options = {
    container: '#waveform',
    waveColor: 'hsla(245, 48%, 26%, 0.7)',
    height: 50,
    audioRate: 1,
    scrollParent: false,
    progressColor: 'hsla(200, 100%, 30%, 0.5)',
    cursorColor: 'dimgrey',
    barWidth: 3
  };

  private  icon = 'play_arrow';
  private wavesurfer = null;
  private songDuration: string;
  private currentTime: string;

  constructor() { }

  ngOnInit() {

    this.wavesurfer = new WaveSurfer(this.options);
    this.wavesurfer.init();
    this.wavesurfer.on('ready', this.wavesurfer.play.bind(this.wavesurfer));


  }

  onResize($event) {
    if (this.wavesurfer != null) {
      console.log('not null')
      this.wavesurfer.drawer.containerWidth = this.wavesurfer.drawer.container.clientWidth;
      this.wavesurfer.drawBuffer();
    }
  }

  load(path) {
    this.wavesurfer.load(path);
  }

  play() {
    if (this.icon == 'pause') {
      this.icon = 'play_arrow';
      this.wavesurfer.pause();
    } else {
      this.icon = 'pause';
      this.wavesurfer.play();
    }
    
    this.wavesurfer.on('ready', function () {
      this.songDuration= formatTime(this.wavesurfer.getDuration());
    });
   
   this.wavesurfer.on('audioprocess', function () {
      this.currentTime = formatTime(this.getCurrentTime());
    });
   
  }
  
  playNext(row){
    var path = this.getPath(row.position)[0].options;
    this.wavesurfer.empty();
    this.load(path);
    this.wavesurfer.on('ready', this.play());
    
  }

  getPath(position){
    // return data.value.filter(x => x.position === position);
  }
  

}

var formatTime = function (time) {
  return [
      Math.floor((time % 3600) / 60), // minutes
      ('00' + Math.floor(time % 60)).slice(-2) // seconds
  ].join(':');
};
