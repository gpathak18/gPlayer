import { Component, OnInit, Output } from '@angular/core';
import { Track } from '../Itarck';
import { PouchDbService } from '../pouch-db.service';
import { EventEmitter } from 'events';
import { DatastoreService } from '../datastore.service';
import { Playlist } from '../IPlaylist';

@Component({
  selector: 'app-player-body-header',
  templateUrl: './player-body-header.component.html',
  styleUrls: ['./player-body-header.component.css']
})
export class PlayerBodyHeaderComponent implements OnInit {

  @Output() addTrack = new EventEmitter();

  private selectedTracks: Array<Track> = new Array();
  private fileType: string = 'audio.*';
  private fileCntr : number = 1;
  private playList : Playlist;
  private playLists;
  private playlistName: string;
  
  constructor(private dbservice: PouchDbService,private datastore: DatastoreService) { }

  ngOnInit() {
 

    this.dbservice.get('DEFAULT_PLAYLIST').then( (doc) => {
        this.playList = doc;
        this.playLists = [{name: this.playList.Name}];
    }).catch( (err) => {
      if(err.status === 404){
        console.log(err)
      }
    });
  
  }

  addPlaylist(event){
    this.playLists.push({name: 'ABC'}); 
    console.log("HERE!");
    
  }

  delete(event){
    this.playLists.splice(1,1); 
    console.log("HERE!");
    
  }

  stopPropagation(event){
    event.stopPropagation();
    console.log("Clicked!");
   
  }
  
  readFiles(inputValue: any): void {
    var files = inputValue.files;
    for (var file of files) {
      if (file.type.match(this.fileType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
        }
        // reader.readAsDataURL(file);
        let track = {
          TrackNumber: this.fileCntr,
          Name: file.name,
          Link: file.path,
          Source: 'computer'
        }
        this.fileCntr++;
        // this.selectedTracks.push(track);
        console.log(track.Name)
        // this.dbservice.put(track,'#1')
        // console.log(this.dbservice.fetch())
        // this.addTrack.emit(this.dbservice.fetch())
        this.selectedTracks.push(track);
        // this.dbservice.fetch().then(function (response) {
        //   var docs = response.rows.map(function (row) { return row.doc; });  
        //   console.log('doc',docs[0]);
        //   console.log('res',response);
        // }).catch(function (err) {
        //   console.log(err);
        // })
        //this.datastore.addTrack()

      }
//      else {
//        alert("File not supported!");
//      }
    }
    console.log(this.playList)
    this.playList.Tracks.Items = this.selectedTracks;
    this.playList.Tracks.TotalItemCount = this.selectedTracks.length
    this.datastore.addTrack(this.selectedTracks)
    this.dbservice.put(this.playList,'DEFAULT_PLAYLIST')
  }
  
  changeListener($event): void {
    this.readFiles($event.target);

  }

}
