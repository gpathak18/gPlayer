import { Component, OnInit } from '@angular/core';
import { PouchDbService } from '../services/pouch-db.service';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css']
})
export class AlbumInfoComponent implements OnInit {

  constructor(
    private dbservice: PouchDbService
  ) { }

  ngOnInit() {
    this.dbservice.getAlbumTracks("NewAlbum").then(function (result) {
      console.log(result)
    }).catch(function (err) {
      console.log(err);
    });
  }

}
