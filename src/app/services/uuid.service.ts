import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UuidService {

  constructor() { }

  getUUID() {
    const id: string = uuid('GPLAYER');
    console.log('UUID',id)
    return id;
  }

}

