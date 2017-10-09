'use strict';
import { Component, OnInit, ViewChild, ElementRef, Input, Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PouchDbService } from '../pouch-db.service';
import { Track } from '../Itarck';
import { DatastoreService } from '../datastore.service';


@Component({
  selector: 'app-player-body-main',
  templateUrl: './player-body-main.component.html',
  styleUrls: ['./player-body-main.component.css']
})
export class PlayerBodyMainComponent implements OnInit {

 @Input('winWdHt') winWdHt  = { tileHeight:'', tileWidth: ''};
 @Input('selected_files') selectedFiles: Element[] = [];

  private displayedColumns = ['TrackNumber', 'Name', 'Link', 'Source'];
  private dataSource: DatastoreService | null;
  private hoverrow: number = -1;
  
  private selectedRowIndex: number = -1;

  constructor(private dbservice: PouchDbService,private datastore: DatastoreService) { 


  }

  async ngOnInit() {
    this.dataSource = new DatastoreService();
    await this.dataSource.connect();
    this.winWdHt.tileHeight = '480'
    this.winWdHt.tileWidth = '500' 
  }

  @ViewChild('filter') filter: ElementRef;
}


// export interface Element {
//   position: number;
//   selection: boolean;
//   name: string;
//   options: string;
// }

// var data: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>(this.selectedFiles);

// @Injectable()
// export class ExampleDataSource extends DataSource<any> {

//   private data: Track[];
//   constructor(private datastore: DatastoreService){
//     super();
//     this.datastore.currentTracks.subscribe(tracks => this.data = tracks)
//   }


//   connect(): Observable<Track[]> {
//     return data;
//   }

//   disconnect() { }
// }

 