import { DatastoreService } from './datastore.service';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AutoplayService } from './autoplay.service';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { FilehandlingService } from './filehandling.service';


@Injectable()
export class PlaylistService {

  private mainLibrary: Playlist;
  private isInstantiated: boolean;
  public user_playlists = new Subject<Array<Playlist>>();
  public playlists: Array<Playlist> = new Array();


  constructor(
    private dbservice: PouchDbService, 
    private datastore: DatastoreService,  
    private autoPlayService: AutoplayService,
    private fileHandler: FilehandlingService
  ) {

    this.fileHandler.tracks.subscribe((tracks) => {
         tracks.map((track:any) => {
            this.mainLibrary.tracks.push(track)            
         })
         this.datastore.addTrack(this.mainLibrary.tracks);
         this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');         
    });
  }

  public initService() {
    //Load Main Library
    if (!this.isInstantiated) {
      this.loadMainlibrary().then((result) => {
        this.mainLibrary = result;
        this.datastore.addTrack(this.mainLibrary.tracks);
        this.autoPlayService.updateAutoPlaylist(this.mainLibrary.tracks)
        this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');
     
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

  public updateMainLibrary(tracks) {
    this.mainLibrary.tracks = tracks;
    this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');
    return this.mainLibrary;     
  }

  public deleteFromMainLibrary(track: any) {
      this.mainLibrary.tracks = this.mainLibrary.tracks.filter((value: any) => value._Id !== track._Id);
      this.dbservice.put(this.mainLibrary, 'MAIN_LIBRARY');
      return this.mainLibrary;
  }

  public createPlaylist(plyLst: Playlist) {
    this.dbservice.put(plyLst).then((result) => {
      if (result.ok) {
        this.playlists.push(plyLst);
        this.user_playlists.next(this.playlists);
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
