import {DatastoreService} from './datastore.service';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import { Playlist } from './playlist';
import { Track } from './track';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PlaylistService {

  private mainLibrary: Playlist;
  private isInstantiated: boolean;
  private userPlaylists = [];

  constructor(private dbservice: PouchDbService, private datastore: DatastoreService) {

  }

  public initService() {
    if (!this.isInstantiated) {
      this.loadMainlibrary().then((result) => {
        this.mainLibrary = result;
        // this.datastore.currentTracks.subscribe(tracks => this.mainLibrary.tracks = tracks);
        this.datastore.addTrack(this.mainLibrary.tracks);
      }).catch((error) => {
        console.log('Error: Main Library: ', error);
      });

      this.getAllPlaylists().then((result) => {
        const rows = result.rows;
        for (const row of rows) {
          if (row.doc.Name !== 'MAIN_LIBRARY') {
            this.userPlaylists.push(row.doc);
          }
       }
      }).catch((error) => {
        console.log('Error: User Playlist: ', error);
      });
    }
  }

  public initMainLibrary(): Playlist {
    const mainLibrary: Playlist = new Playlist('MAIN_LIBRARY');
    mainLibrary.trackCount = 0;
    mainLibrary.isHidden = true;
    mainLibrary.userIsOwner = true;
    mainLibrary.tracks = Array<Track>();
    return mainLibrary;
  }

  public loadMainlibrary(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.dbservice.get('MAIN_LIBRARY').catch((err) => {
        if (err.status === 404) {
          const mainLibrary = this.initMainLibrary();
          this.dbservice.put(mainLibrary, 'MAIN_LIBRARY');
          return mainLibrary;
        } else {
          throw err;
        }
      }).then((_mainLibrary) => {
        const mainLibrary: Playlist = new Playlist('MAIN_LIBRARY');
        mainLibrary.tracks = _mainLibrary.Tracks;
        mainLibrary.trackCount = _mainLibrary.TrackCount;
        resolve(mainLibrary);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getAllPlaylists(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.dbservice.fetchAll().then((playlists) => {
        resolve(playlists);
      }).catch((err) => {
        reject(err);
      });

    });
  }

  public getUserPlaylists(): any {
    return this.userPlaylists;
  }

  public getMainLibrary(): Playlist {
   return this.mainLibrary;
  }


  public addToMainLibrary(track: Track) {

  }

  public deleteFromMainLibrary(track: Track) {

  }

  public createPlaylist(plyLstName: string) {
    this.dbservice.put(plyLstName);
  }

  public addToPlaylist(track: Track) {

  }

  public deleteFromPlaylist(track: Track) {

  }

  public deletePlaylist(plyLstName: string) {
    this.dbservice.delete(plyLstName);
  }

}
