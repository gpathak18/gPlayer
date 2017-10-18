import { DatastoreService } from './datastore.service';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import { Playlist } from './playlist';
import { Track } from './track';
import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PlaylistService {

  private mainLibrary: Playlist;
  private isInstantiated: boolean;
  public user_playlists = new Subject<Playlist>();
  public delete_playlist = new Subject();

  constructor(private dbservice: PouchDbService, private datastore: DatastoreService) {

  }

  public initService() {
    if (!this.isInstantiated) {
      this.loadMainlibrary().then((result) => {
        this.mainLibrary = result;
        this.datastore.addTrack(this.mainLibrary.tracks);
      }).catch((error) => {
        console.log('Error: Main Library: ', error);
      });

      this.loadUserPlaylists();
    }
  }

  public loadUserPlaylists() {
    this.getAllPlaylists().then((result) => {
      const rows = result.rows;
      for (const row of rows) {
        if (row.doc.Name !== 'MAIN_LIBRARY') {
          this.user_playlists.next(row.doc);
        }
      }
    }).catch((error) => {
      console.log('Error: User Playlist: ', error);
    });
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

  public getMainLibrary(): Playlist {
    return this.mainLibrary;
  }

  public addToMainLibrary(track: Track) {

  }

  public deleteFromMainLibrary(track: Track) {

  }

  public createPlaylist(plyLst: Playlist) {
    this.dbservice.put(plyLst).then((result) => {
      if (result.ok) {
        this.user_playlists.next(plyLst);
        console.log(this.user_playlists);
      }
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  public deletePlaylist(plyLst) {
    console.log(plyLst)
    this.dbservice.delete(plyLst.Name);
    this.delete_playlist.next(plyLst);
    console.log(this.user_playlists)
    this.user_playlists.map((val) => console.log(val));

  }

  public addToPlaylist(track: Track) {

  }

  public deleteFromPlaylist(track: Track) {

  }

}
