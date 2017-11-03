import { Injectable } from '@angular/core';
import { Track } from '../track';
// import * as id3 from 'id3js';
import * as jsmediatags from 'jsmediatags';
import { Subject } from 'rxjs';
import Utility from '../Utility';
import { DatastoreService } from './datastore.service';

@Injectable()
export class FilehandlingService {

  private fileType = 'audio.*';
  public tracks = new Subject<Array<Track>>();
  // public newlyAddedTracks = this.tracks.asObservable();

  constructor(
    private datastore: DatastoreService
  ) {

  }

  public readFiles(files: any) {
    this.processID3Tags(files).then((result) => {
      console.log(result)
      this.tracks.next(result);
    }).catch((error) => {
      console.log("error",error)
    });
  }

  private processID3Tags(files): Promise<any> {
    return new Promise((resolve, reject) => {
      
      let index=0;
      let tracksArray: Array<Track> = new Array();
      let filteredFiles: Array <any>= new Array();

      for (const file of files) {
        if (file.type.match(this.fileType)) {
          filteredFiles.push(file);
        }
      }

      let totalFiles = filteredFiles.length;

      for (const file of filteredFiles) {

          const track = new Track(file.name);
          track.id = Utility.getUUID();

          jsmediatags.read(file, {
            onSuccess: (tag) => {
              let tags = tag.tags;
              console.log(tags);

              if (tags) {

                if (tags.title) {
                  track.name = tags.title
                } else {
                  track.name = file.name.replace(/\.[^/.]+$/, "")
                }

                track.artist = tags.artist

                if (tags.track) {
                  track.trackNumber = tags.track;
                } else {
                  track.trackNumber = 1;
                }

                track.year = tags.year
                track.album = tags.album
                track.genres = [file.genre];
                track.lyrics = file.lyrics;
                track.source = 'local';
                track.link = file.path;
                

                let image = tags.picture;
                if (image) {
                  let base64String = "";
                  for (var i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                  }
                  track.image = "data:image/jpeg;base64," + window.btoa(base64String);
                } else {
                  track.image = "None"
                }
                
              }
              index++;    
              tracksArray.push(track);
              if(index===totalFiles){
                resolve(tracksArray);                
              }
            },
            onError: (error) => {
              console.log(error);
            }
          });
        }      
         
   
    });
  }

}
