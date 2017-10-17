import { Component, OnInit, Output, Input } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';
import { EventEmitter } from 'events';
import { DatastoreService } from '../datastore.service';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { Track } from '../track';

@Component({
  selector: 'app-player-body-header',
  templateUrl: './player-body-header.component.html',
  styleUrls: ['./player-body-header.component.css']
})
export class PlayerBodyHeaderComponent implements OnInit {

  private playlistname = '';

  private selectedTracks: Array<Track> = new Array();
  private fileType = 'audio.*';
  private fileCntr = 1;
  private mainLibrary: Playlist;
  private playLists = [];
  private playlistName: string;

  constructor(private dbservice: PouchDbService, private datastore: DatastoreService, private playlistService: PlaylistService) { }

  ngOnInit() {

    this.loadPlaylists();
  }

  // tslint:disable-next-line:one-line
  private addPlaylist($event) {
    if (this.playlistname != null && this.playlistname.length > 0) {
      const plylst = new Playlist(this.playlistname);
      this.dbservice.put(plylst).then ((result) => {
        this.playLists.push(plylst);
      }).catch((error) => {
        console.log('could add playlist');
      });

    }
  }

  // tslint:disable-next-line:one-line
  private deletePlaylist($event){
    this.playLists.splice(0, 1);
    this.dbservice.delete($event.target.id);
  }

  private loadPlaylists() {

    this.playlistService.getAllPlaylists().then((result) => {
      const rows = result.rows;
      for (const row of rows) {
        if (row.doc.Name !== 'MAIN_LIBRARY') {
          this.playLists.push(row.doc);
        }
     }
     console.log(this.playLists);

    }).catch((error) => {
      console.log(error);
    });
  }

  private stopPropagation(event) {
    event.stopPropagation();
  }

  private readFiles(inputValue: any): void {
    this.mainLibrary = this.playlistService.getMainLibrary();
    const files = inputValue.files;
    for (const file of files) {
      if (file.type.match(this.fileType)) {
        const reader = new FileReader();
        reader.onload = function(e) {
        };
        // reader.readAsDataURL(file);

        const track = new Track(file.name);
        track.trackNumber = this.fileCntr;
        track.source = 'local';
        track.link = file.path;

        this.fileCntr++;
        console.log(this.mainLibrary.tracks);
        this.mainLibrary.tracks.push(track);

      }
//      else {
//        alert("File not supported!");
//      }
    }

    this.mainLibrary.trackCount = this.mainLibrary.tracks.length;
    this.datastore.addTrack(this.mainLibrary.tracks);
    this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');

  }

  changeListener($event): void {
    this.readFiles($event.target);
  }

}
