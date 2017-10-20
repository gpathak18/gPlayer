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
  public user_playlists = new Subject<Array<Playlist>>();
  public playlists: Array<Playlist> = new Array();


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
          this.playlists.push(row.doc);
        }
      }
      this.user_playlists.next(this.playlists);
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
        this.playlists.push(plyLst);
        this.user_playlists.next(this.playlists);
        console.log(this.user_playlists);
      }
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  public deletePlaylist(plyLst_id: string) {
    this.dbservice.delete(plyLst_id).then( (result) => {
      this.playlists = this.playlists.filter((value: any) => value.Name !== plyLst_id);
      this.user_playlists.next(this.playlists);
    }).catch( (error) => {
      console.log(error);
    });
  }

  public addToPlaylist(track: any, plylst?: any): Promise<any> {
    plylst.Tracks.push(track);
    return this.dbservice.put(plylst);
  }

  public deleteFromPlaylist(track: Track)  {

  }

}
