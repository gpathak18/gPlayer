import { Injectable } from '@angular/core';
import { Track } from '../track';
import * as id3 from 'id3js';
import { Subject } from 'rxjs';
import Utility from '../Utility';

@Injectable()
export class FilehandlingService {

  private fileType = 'audio.*';
  public tracks = new Subject<Array<Track>>();
  // public newlyAddedTracks = this.tracks.asObservable();

  private tracksArray: Array<Track> = new Array();

  constructor() { }

  public readFiles(files: any) {

    for (const file of files) {

      if (file.type.match(this.fileType)) {

        const reader = new FileReader();

        reader.onload = function (e) {

        };

        // reader.readAsDataURL(file);
        const track = new Track(file.name);

        id3(file, (err, tags) => {
          if (err) {
            console.log(err);
          } else {
            console.log(tags)
            if (tags.title) {
              track.name = tags.title
            } else {
              track.name = file.name.replace(/\.[^/.]+$/, "")
            }
            track.artist = tags.artist
            if(tags.track) {
              track.trackNumber = tags.track;
            } else{
              track.trackNumber = 1;
            }
          
            track.image = tags.v2.image
            track.year = tags.year
            track.album = tags.album
          }
        });

        track.id = Utility.getUUID();
        track.trackNumber = 1;
        track.source = 'local';
        track.link = file.path;
        this.tracksArray.push(track);
      }
    }
    //push to the stream
    this.tracks.next(this.tracksArray);
  }

}
