'use strict';

const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')

const url = require('url')
const remote = require('electron').remote;

let win
// let splashScreen

function createWindow() {

  win = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    },
    titleBarStyle: 'hidden',
    width: 500,
    height: 700,
    frame: false,
    show: false,
    transparent: true,
    radii: [5, 5, 5, 5],
    backgroundColor: '#282364',
    icon: `file://__dirname/assets/png/64x64.png`

  })

  win.loadURL('http://localhost:4200')
  // win.loadURL('file:///' + __dirname + '/dist/index.html')
  win.setMaximumSize(700, 860)
  win.setMinimumSize(500, 600)

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    // setTimeout(function () {
      // displayNow(splashScreen, win);
      console.log(win);
      win.show()
    // }, 1000);
  })

  // win.webContents.on('will-navigate', ev => {
  //   console.log(ev);
  //   ev.preventDefault();
  // })

  win.ondragover = function(e) {
    // $('body').addClass('file-hover');
    console.log(e);
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    return false;
  };
  
  win.ondrop = function(e) {
    console.log(e);
    e.preventDefault();
    // $('body').removeClass('file-hover');
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      console.log(e.dataTransfer.files[i].path);
    }
    return false;
  };

}

function displayNow(splashScreen, win) {
  // splashScreen.close()
  win.show()
}
app.on('ready', function () {

  // splashScreen = new BrowserWindow({
  //   width: 800,
  //   height: 400,
  //   frame: false,
  //   transparent: true,
  //   show: true,
  //   radii: [5, 5, 5, 5],
  //   backgroundColor: '#EFEFEF'
  // })
  //
  // splashScreen.loadURL(url.format({
  //   pathname: path.join(__dirname, 'splash.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  //
  // splashScreen.once('ready-to-show', () => {
  //   splashScreen.show();
  // })

  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
    // setListeners()
    
  }
})

function setListeners(){
  win.ondragover = function(e) {
    // $('body').addClass('file-hover');
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    return false;
  };
  
  win.ondrop = function(e) {
    e.preventDefault();
    // $('body').removeClass('file-hover');
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
      console.log(e.dataTransfer.files[i].path);
    }
    return false;
  };
}
// process.argv.forEach(onOpen)

// Open handlers should be added on the first tick.
// These fire if the app is already running and the user
// drags files or URLs onto the dock icon, or if they set
// the app as a handler for a file type and then open a file
// app.on('open-file', (e) => {
// console.log('he',e)
// })


// app.on('open-url', (e) => {
//   console.log('hes',e)
// })


