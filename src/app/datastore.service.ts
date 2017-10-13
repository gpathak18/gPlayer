import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Track } from './Itarck';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatastoreService extends DataSource<any> {

  private data: BehaviorSubject<Array<Track>> = new BehaviorSubject<Array<Track>>([]);

  currentTracks = this.data.asObservable();
  
  constructor() {
    super();
  }

  addTrack(tracks: Array<Track>) {
    this.data.next(tracks)
  }

  connect(): Observable<Array<Track>> {    
    return this.currentTracks;
  }

  disconnect() { }
  
}
