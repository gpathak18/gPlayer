import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Track } from './Itarck';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatastoreService extends DataSource<Track> {

  //private selectedTracks: Track[] = [];
  
  private data: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);

  currentTracks = this.data.asObservable();
  
  constructor() {
    super();
    // this.selectedTracks.push({
    //   TrackNumber: 1,
    //   Name: "Song",
    //   Link: 'Link',
    //   Source: 'src'
    // }) 
    // this.currentTracks.subscribe(tracks => console.log(tracks))
  }

  addTrack(tracks: Track[]) {
    this.data.next(tracks)
    console.log(this.data)
 
  }

  connect(): Observable<Track[]> {
    
    return this.currentTracks;
  }

  disconnect() { }
  
}
