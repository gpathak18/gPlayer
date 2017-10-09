import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Track } from './Itarck';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatastoreService extends DataSource<any> {

  //private selectedTracks: Track[] = [];
  
  private data: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);

  currentTracks = this.data.asObservable();
  
  constructor() {
    super();
  }

  addTrack(tracks: Track[]) {
    this.data.next(tracks)
  }

  connect(): Observable<Track[]> {    
    return this.currentTracks;
  }

  disconnect() { }
  
}
