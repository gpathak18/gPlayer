import { Component, OnInit } from '@angular/core';
import { Track } from '../Itarck';
import { PouchDbService } from '../pouch-db.service';

@Component({
  selector: 'app-player-body-header',
  templateUrl: './player-body-header.component.html',
  styleUrls: ['./player-body-header.component.css']
})
export class PlayerBodyHeaderComponent implements OnInit {

  private selectedTracks: Track[] = new Array();
  private fileCntr : number = 1;
  private fileType: string = 'audio.*';
  private selectedRowIndex: number = -1;
  private hoverrow: number = -1;

  constructor(dbservice: PouchDbService) { }

  ngOnInit() {
    // this.selectedFiles  = [];
  }

  readFiles(inputValue: any): void {
    var files = inputValue.files;
    for (var file of files) {
      if (file.type.match(this.fileType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
        }
        // reader.readAsDataURL(file);
        // const copiedData = data.value;
        let track = {
          Name: file.Name,
          Link: file.path,
          Source: 'computer'
        }
        // track.position = this.fileCntr;
        this.selectedTracks.push(track);
        this.fileCntr++;
        // data.next(copiedData);
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
    
  }
  
  
  changeListener($event): void {
    this.readFiles($event.target);
  }

}
