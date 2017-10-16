import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import { Playlist } from './playlist';
import { Track } from './track';

@Injectable()
export class PlaylistService {

  constructor(private dbservice: PouchDbService) { 

    
  }

  public initLibrary(): Playlist{
    let playlist: Playlist = new Playlist('MAIN_LIBRARY')
    playlist.trackCount = 0;
    playlist.isHidden = true;
    playlist.userIsOwner = true;
    console.log(playlist)
    return playlist;
  }


  public loadMainlibrary(): Promise<any>{

    return  new Promise((resolve, reject) => {
     
      this.dbservice.get('MAIN_LIBRARY').catch( (err) => {
        if (err.status === 404) {
          let mainLibrary = this.initLibrary();
          this.dbservice.put(mainLibrary,'MAIN_LIBRARY')
          return mainLibrary;
        } else { 
          throw err;
        }
      }).then( (mainLibrary) => {
        resolve(mainLibrary)       
      }).catch( (err) => {
        reject(err)
      });
    });
  }

  public getAllPlaylists(): Promise<any>{
    return  new Promise((resolve, reject) => {
    
       this.dbservice.fetchAll().then( (playlists) => {
            resolve(playlists)         
       }).catch( (err) => {
            reject(err)
       });

     });
  }

  public addToMainLibrary(track: Track){

  }

  public deleteFromMainLibrary(track: Track){
    
  }

  public createPlaylist(plyLstName: string){
    this.dbservice.put(plyLstName)
  }

  public addToPlaylist(track: Track){
    
  }

  public deleteFromPlaylist(track: Track){
    
  }

  public deletePlaylist(plyLstName: string){
    this.dbservice.delete(plyLstName) 
  }

}
