const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')
const remote = require('electron').remote;

let win
let splashScreen

function createWindow() {

  win = new BrowserWindow({

    width: 400,
    height: 600,
    frame: false,
    show: false,
    transparent: true,
    radii: [5, 5, 5, 5],
    backgroundColor: '#577399'

  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    setTimeout(function () {
      displayNow(splashScreen, win);
    }, 1000);
  })

}

function displayNow(splashScreen, win) {
  splashScreen.close()
  win.show()
}
app.on('ready', function () {

  splashScreen = new BrowserWindow({
    width: 800,
    height: 400,
    frame: false,
    transparent: true,
    show: true,
    radii: [5, 5, 5, 5],
    backgroundColor: '#EFEFEF'
  })

  splashScreen.loadURL(url.format({
    pathname: path.join(__dirname, 'splash.html'),
    protocol: 'file:',
    slashes: true
  }))

  splashScreen.once('ready-to-show', () => {
    splashScreen.show();
  })

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
  }
})
