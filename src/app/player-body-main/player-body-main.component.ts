'use strict';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-player-body-main',
  templateUrl: './player-body-main.component.html',
  styleUrls: ['./player-body-main.component.css']
})
export class PlayerBodyMainComponent implements OnInit {

 @Input('winWdHt') winWdHt  = { tileHeight:'', tileWidth: ''};
 @Input('selected_files') selectedFiles: Element[] = [];

  private displayedColumns = ['position', 'selection', 'name', 'options'];
  private dataSource: ExampleDataSource | null;

  constructor() { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource();
    this.winWdHt.tileHeight = '480'
    this.winWdHt.tileWidth = '500'  
  }
  @ViewChild('filter') filter: ElementRef;
}

export interface Element {
  position: number;
  selection: boolean;
  name: string;
  options: string;
}

var data: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>(this.selectedFiles);

export class ExampleDataSource extends DataSource<any> {

  connect(): Observable<Element[]> {
    return data;
  }

  disconnect() { }
}

 