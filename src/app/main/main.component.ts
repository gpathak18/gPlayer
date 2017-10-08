import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private tileWdHt = {
    tileHeight : '',
    tileWidth : ''
  }
  private tileHeight : string;
  private tileWidth : string;

  constructor(private el:ElementRef){ }

  ngOnInit() {
  }

  onResize($elm){
    let element = $elm._element.nativeElement
    this.tileWdHt.tileHeight = element.offsetHeight;
    this.tileWdHt.tileWidth = element.offsetWidth;  
  }
}
