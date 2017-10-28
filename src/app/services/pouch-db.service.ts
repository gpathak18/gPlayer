import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class PouchDbService {

  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();
  private DB_NAME = 'GPLAYER';

  constructor( ) {

    if (!this.isInstantiated) {
      this.database = new PouchDB(this.DB_NAME, { auto_compaction: true});
      this.isInstantiated = true;
    }

  }

  public fetchAll() {
    return this.database.allDocs({include_docs: true});
  }

  public get(id: string) {
    return this.database.get(id);
  }

  public delete(id: string) {
    return this.database.get(id).then( (doc) => {
      return this.database.remove(doc._id, doc._rev);
    });
  }

  public put(document: any, id?: string) {
    return this.get(document._id).then( result => {
        document._rev = result._rev;
        return this.database.put(document);
    }, error => {
        if (error.status === 404) {
            return this.database.put(document);
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
  }

  public sync(remote: string) {
    const remoteDatabase = new PouchDB(remote);
    this.database.sync(remoteDatabase, {
        live: true
    }).on('change', change => {
      console.log('changed');
        this.listener.emit(change);
    });
 }

  public getChangeListener() {
    return this.listener;
  }

}
