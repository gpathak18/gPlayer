import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Track } from '../track';
import { LibTableModel } from '../libtablemodel';


@Injectable()
export class DatastoreService extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  public libTableData: BehaviorSubject<Array<Track>> = new BehaviorSubject<Array<Track>>([]);

  public currentTracks = this.libTableData.asObservable();

  constructor() {
    super();
  }

  public addTrack(tracks: Array<Track>) {
    tracks.map((o: any, i: any) => {
      o.Position = i + 1;
    })
    this.libTableData.next(tracks);
  }

  get filter(): string { 
    return this._filterChange.value; 
  }

  set filter(filter: string) { 
    this._filterChange.next(filter);
  }

  get data(): Array<Track> { 
    return this.libTableData.value; 
  }

  connect(): Observable<Array<Track>> {
  
    const displayDataChanges = [
      this.libTableData,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.data.slice().filter((track: any) => {
        let searchStr = (track.Name + track.Artist).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });

  }

  disconnect() { }

}
