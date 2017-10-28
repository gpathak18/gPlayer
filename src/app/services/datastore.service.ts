import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Track } from '../track';


@Injectable()
export class DatastoreService extends DataSource<any> {

  
  private libTableData: BehaviorSubject<Array<Track>> = new BehaviorSubject<Array<Track>>([]);

  public currentTracks = this.libTableData.asObservable();

  constructor() {
    super();
  }

  addTrack(tracks: Array<Track>) {
    tracks.map((o:any,i:any) => { 
      o.TrackNumber = i+1
    })
    this.libTableData.next(tracks);
  }

  connect(): Observable<Array<Track>> {
    return this.currentTracks;
  }

  disconnect() { }

}
