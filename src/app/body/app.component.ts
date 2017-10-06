'use strict';
import { Component, ElementRef, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileCntr : number = 1;
  filestring: string;
  rowHeight: string = '4:1';
  songDuration: string;
  currentTime: string;
  color: string;
  icon = 'play_arrow';
  displayedColumns = ['position', 'selection', 'name', 'options'];
  dataSource: ExampleDataSource | null;

  typesOfShoes = ['Beat It', 'Billie Jean', 'Everything I Do', 'River Dance', 'No One Loves You'];


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

  private wavesurfer = null;

  constructor() {

  }

  ngOnInit() {
    this.wavesurfer = new WaveSurfer(this.options);
    this.wavesurfer.init();
    this.wavesurfer.on('ready', this.wavesurfer.play.bind(this.wavesurfer));
    this.dataSource = new ExampleDataSource();

  }

  onPlayerReady(){
      
      //this.songDuration=this.formatTime(this.wavesurfer.getDuration());
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
  


//   formatTime(time): string {
//    return [
//        Math.floor((time % 3600) / 60), // minutes
//        ('00' + Math.floor(time % 60)).slice(-2) // seconds
//    ].join(':');
//   }

  getPath(position){
    return data.value.filter(x => x.position === position);
  }
  
  selectedRowIndex: number = -1;
  hoverrow: number = -1;
  fileType: string = 'audio.*';

  highlight(row) {
    this.selectedRowIndex = row.position;
  }

  hover(row) {
    if (row.position != this.selectedRowIndex) {
      this.hoverrow = row.position;
    } else {
      this.hoverrow = -1;
    }
  }

  remove(){
    data.value.splice(2,1);
    console.log(data)
  
  }
  
  
  changeListener($event): void {
    this.readFiles($event.target);
  }

  readFiles(inputValue: any): void {
    var files = inputValue.files;
    for (var file of files) {
      if (file.type.match(this.fileType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
        }
        reader.readAsDataURL(file);
        const copiedData = data.value;
        copiedData.push({ position: this.fileCntr, selection: true, name: file.name, options: file.path });
        this.fileCntr++;
        data.next(copiedData);
      }
//      else {
//        alert("File not supported!");
//      }
    }
  }
  @ViewChild('filter') filter: ElementRef;
}

  var formatTime = function (time) {
    return [
        Math.floor((time % 3600) / 60), // minutes
        ('00' + Math.floor(time % 60)).slice(-2) // seconds
    ].join(':');
  };

export interface Element {
  name: string;
  position: number;
  options: string;
  selection: boolean;
}

var data: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
 
/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  
  connect(): Observable<Element[]> {
    return data;
  }

  disconnect() { }
}
