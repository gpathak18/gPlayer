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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filestring: string;
  rowHeight: string = '4:1';
  songDuration: string;
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
    this.load()
    this.dataSource = new ExampleDataSource();
    //     Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //        .debounceTime(150)
    //        .distinctUntilChanged()
    //        .subscribe(() => {
    //          if (!this.dataSource) { return; }
    //          this.dataSource.filter = this.filter.nativeElement.value;
    //        });
  }

  onResize($event) {
    if (this.wavesurfer != null) {
      this.wavesurfer.drawer.containerWidth = this.wavesurfer.drawer.container.clientWidth;
      this.wavesurfer.drawBuffer();

    }
  }

  load() {
    this.wavesurfer.load('assets/sample.mp3');
  }

  play() {
    if (this.icon == 'pause') {
      this.icon = 'play_arrow';
      this.wavesurfer.pause();
    } else {
      this.icon = 'pause';
      this.wavesurfer.play();
    }
    this.songDuration = this.wavesurfer.getDuration();
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
        data.push({ position: 1, selection: true, name: file.name, options: '' });
      } else {
        alert("File not supported!");
      }
    }
    console.log(data)
    this.dataSource.connect();
  }
  @ViewChild('filter') filter: ElementRef;
}

export interface Element {
  name: string;
  position: number;
  options: string;
  selection: boolean;
}

const data: Element[] = [
  // { position: 1, selection: true, name: 'Hydrogen', options: '' },
  // { position: 2, selection: true, name: 'Helium', options: '' },
  // { position: 3, selection: true, name: 'Lithium', options: '' },
  // { position: 4, selection: true, name: 'Beryllium', options: '' },
  // { position: 5, selection: true, name: 'Boron', options: '' },
  // { position: 6, selection: true, name: 'Carbon', options: '' },
  // { position: 7, selection: true, name: 'Carbon', options: '' },
  // { position: 8, selection: true, name: 'Carbon', options: '' },
  // { position: 9, selection: true, name: 'Carbon', options: '' },
  // { position: 10, selection: true, name: 'Carbon', options: '' },
  // { position: 11, selection: true, name: 'Carbon', options: '' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  //  _filterChange = new BehaviorSubject('');
  //  get filter(): string { return this._filterChange.value; }
  //  set filter(filter: string) { this._filterChange.next(filter); }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    //  bh: BehaviorSubject<Element[]> = new BehaviorSubject(Element[]);
    //     const displayDataChanges = [
    //      this._exampleDatabase.dataChange,
    //      this._filterChange,
    //    ];
    //
    //    return Observable.merge(...displayDataChanges).map(() => {
    //      return this._exampleDatabase.data.slice().filter((item: UserData) => {
    //        let searchStr = (item.name + item.color).toLowerCase();
    //        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
    //      });
    //    });

   return Observable.of(data);
  }

  disconnect() { }
}
