'use strict';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-player-body',
  templateUrl: './player-body.component.html',
  styleUrls: ['./player-body.component.css']
})
export class PlayerBodyComponent implements OnInit {

  private displayedColumns = ['position', 'selection', 'name', 'options'];
  private dataSource: ExampleDataSource | null;
  private fileCntr : number = 1;
  private fileType: string = 'audio.*';
  private selectedRowIndex: number = -1;
  private hoverrow: number = -1;

  constructor() { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource();
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


  @ViewChild('filter') filter: ElementRef;

}
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
