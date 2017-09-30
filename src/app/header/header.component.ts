import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('navBarAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
      transition('small => large', animate('100ms ease-in')),
    ]),

  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  windowAction(action){
    alert("hello");
    // var theWindow :BrowserWindow = BrowserWindow.getFocusedWindow();
    // if (action == "min") {
    //   theWindow.minimize();
    // } else if (action == "max") {
    //   theWindow.maximize();
    // } else {
    //   theWindow.close();
    // }
  }

}
