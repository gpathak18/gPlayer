import {Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
// import {BrowserWindow, remote} from 'electron';
import {parse} from 'url';
import qs from 'qs';
declare const window: any;
// const { BrowserWindow } = window.require("electron").remote
// const BrowserWindow = window.require("electron")
// import * as drive from 'googledrive';
declare var gapi: any;


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('signin') authorizeButton: ElementRef;
  @ViewChild('signout') signoutButton: ElementRef;

  // public authWindow = new BrowserWindow({ width: 800, height: 600, show: false });
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private thisDomElm: ElementRef) { }

  ngOnInit() {
    
    gapi.load('client', {
      callback: () => this.handleClientLoad(),
      onerror: function () {
        alert('gapi.client failed to load!');
      },
      timeout: 5000, // 5 seconds.
      ontimeout: function () {
        alert('gapi.client could not load in a timely manner!');
      }
    });

    // this.authWindow.on('closed', () => {
    //   throw new Error('Auth window was closed by user')
    // })
  
    // this.authWindow.webContents.on('will-navigate', (event, url) => {
    //   // handleNavigation(url)
    // })
  
    // this.authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    //   // handleNavigation(newUrl)
    // })
  
    // this.authWindow.loadURL(authUrl)

  }

  
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient());
  }

  initClient() {

    let CLIENT_ID = '';
    let API_KEY = '';
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    let SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
    let that = this;

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
      redirect_uri: 'http://localhost:4200/sign',
      ux_mode: 'redirect'
    }).then(function () {

      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);
      that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // that.authorizeButton.nativeElement.onclick = that.handleAuthClick;
      // that.signoutButton.nativeElement.onclick = that.handleSignoutClick;

    });

   
  }

  showUser(a){
    console.log(a)
  }
  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      //authorizeButton.style.display = 'none';
      //signoutButton.style.display = 'block';
      this.listFiles();
    } else {
      //authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
    }
  }

  /**
      *  Sign in the user upon button click.
      */
  handleAuthClick(event) {

    Promise.resolve(gapi.auth2.getAuthInstance().signIn()).catch(function(error) {
      if (error && error.error == 'popup_blocked_by_browser') {
        console.log('error')
      } else {
        console.log('error',error)
      }
    });
   
    // gapi.auth2.getAuthInstance().signIn();
    console.log('done..')
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message) {
    // var pre = document.getElementById('content');
    // var textContent = document.createTextNode(message + '\n');
    // pre.appendChild(textContent);
    console.log(message)
  }

  /**
   * Print files.
   */
  listFiles() {
    let that = this;
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then(function (response) {
      that.appendPre('Files:');
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          that.appendPre(file.name + ' (' + file.id + ')');
        }
      } else {
        that.appendPre('No files found.');
      }
    });
  }
}
