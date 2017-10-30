import { Component, OnInit, ElementRef } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private tileWdHt = {
    tileHeight : '',
    tileWidth : ''
  };

  private tileHeight: string;
  private tileWidth: string;

  constructor(
    private el: ElementRef, 
    private playlistService: PlaylistService, 
    private datastore: DatastoreService
  ) { }

  ngOnInit() {
    this.playlistService.initService();
  }

  onResize($elm) {
    const element = $elm._element.nativeElement;
    this.tileWdHt.tileHeight = element.offsetHeight;
    this.tileWdHt.tileWidth = element.offsetWidth;
  }
}
