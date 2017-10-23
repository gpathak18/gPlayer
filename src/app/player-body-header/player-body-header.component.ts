import { Component, OnInit, Output, Input } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';
import { EventEmitter } from 'events';
import { DatastoreService } from '../datastore.service';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../playlist';
import { Track } from '../track';
var fs = require('fs');
var mm = require('musicmetadata');

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
  private playLists: Array<Playlist> = new Array();
  private playlistName: string;
  selTab = 0;
  constructor(private dbservice: PouchDbService, private datastore: DatastoreService, private playlistService: PlaylistService) { }

  ngOnInit() {

    this.loadPlaylists();


  }

  setTab(tab) {
    this.selTab = tab;
  }
  private addPlaylist($event) {
    if (this.playlistname != null && this.playlistname.length > 0) {
      const plylst = new Playlist(this.playlistname);
      console.log('ADDING playlist');
      this.playlistService.createPlaylist(plylst);
    }
  }

  private deletePlaylist($event) {
    // const plylist = this.playLists.find((value) => value.name === $event.target.id);
    this.playlistService.deletePlaylist($event.target.id);
    // this.playLists.splice(0, 1);
    // this.dbservice.delete(plylist.Name);
  }

  private loadPlaylists() {
    // this.playlistService.user_playlists.subscribe(value => this.playLists.push(value));
    this.playlistService.user_playlists.subscribe(value => this.playLists = value);
  }

  private stopPropagation(event) {
    event.stopPropagation();
  }

  

  private readFiles(inputValue: any): void {
    this.mainLibrary = this.playlistService.getMainLibrary();
    this.fileCntr = Number(this.mainLibrary.trackCount) + 1;
    const files = inputValue.files;
    const HEADER_SIZE = 10;
    var arrayBuffer;
    let synchToInt = synch => {
      const mask = 0b01111111;
      let b1 = synch & mask;
      let b2 = (synch >> 8) & mask;
      let b3 = (synch >> 16) & mask;
      let b4 = (synch >> 24) & mask;
    
      return b1 | (b2 << 7) | (b3 << 14) | (b4 << 21);
    };
    for (const file of files) {
      if (file.type.match(this.fileType)) {
        const reader = new FileReader();
       
        reader.onload = function(e) {
           arrayBuffer = reader.result;

           let header = new DataView(arrayBuffer, 0, HEADER_SIZE);       
           let major = header.getUint8(3);
           let minor = header.getUint8(4);
           let version = `ID3v2.${major}.${minor}`;
           console.log(version);
           let size = synchToInt(header.getUint32(6));
           let offset = HEADER_SIZE;
           let id3Size = HEADER_SIZE + size;

           let decodeFrame = (buffer, offset) => {
            let header = new DataView(buffer, offset, HEADER_SIZE + 1);
            if (header.getUint8(0) === 0) { return; }
          };
         
          //  while (offset < id3Size) {
          //   let frame = decodeFrame(arrayBuffer, offset);
          //   if (!frame) { break; }
          //   console.log(`${frame.id}: ${frame.value.length > 200 ? '...' : frame.value}`);
          //   offset += frame.size;
          //  }

        };

        reader.readAsArrayBuffer(file);
          
        const track = new Track(file.name);
        track.trackNumber = this.fileCntr;
        track.source = 'local';
        track.link = file.path;

        this.fileCntr++;
        console.log(this.mainLibrary.tracks);
        this.mainLibrary.tracks.push(track);

        var parser = mm(fs.createReadStream('assets/sample.mp3'), function (err, metadata) {
          if (err) throw err;
          console.log(metadata);
        });
      }


    }
    this.mainLibrary.trackCount = this.mainLibrary.tracks.length;
    this.datastore.addTrack(this.mainLibrary.tracks);
    this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');
  }

  changeListener($event): void {
    this.readFiles($event.target);
  }

}
