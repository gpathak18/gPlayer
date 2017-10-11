import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    var CLIENT_ID = '<YOUR_CLIENT_ID>';
    var API_KEY = '<YOUR_API_KEY>';
  
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v2/rest"];
  
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');

    //gapi.load('client:auth2', initClient);

  }

}
