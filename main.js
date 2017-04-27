const electron = require('electron')
  // Module to control application life.
const app = electron.app
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const Config = require('electron-config')
const config = new Config()
const {ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, winsize = config.get('winsize'), winWidth = 0, winHeight = 0, itemsarr, todos = config.get('todo-list')

function createWindow() {
  // Create the browser window.
  winWidth = winsize ? config.get('winsize.width') : 800
  winHeight = winsize ? config.get('winsize.height') : 600
  itemsarr = todos.length > 0 ? todos : []
  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: 300,
    minHeight: 200,
    frame: false,
    transparent: true
  })
  mainWindow.setResizable(true)
// un-comment this if you like to keep the same aspect ratio when
// mainWindow.setAspectRatio(1.3)
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('get-items', function(event, args){
  event.sender.send('send-items', itemsarr)
})

ipcMain.on('add-item', function(event, args){
  itemsarr.push(args)
  config.set('todo-list', itemsarr)
  event.sender.send('send-items', itemsarr)
})
ipcMain.on('completed-action', function(event, args){
  return itemsarr.filter(function(item, index){
    if(item.title === args.title && item.details === args.details){
      itemsarr[index] = args
      config.set('todo-list', itemsarr)
      event.sender.send('send-items', itemsarr)
      return
    }
  })
})
ipcMain.on('delete-item', function(event, args){
  return itemsarr.filter(function(item, index){
    if(item.title === args.title && item.details === args.details){
      itemsarr.splice(index, 1)
      config.set('todo-list', itemsarr)
      event.sender.send('send-items', itemsarr)
      return
    }
  })
})

ipcMain.on('app-close', function(event, args){
  winHeight = mainWindow.getSize()[1]
  winWidth = mainWindow.getSize()[0]
  config.set('winsize.height', winHeight)
  config.set('winsize.width', winWidth)
  config.set('todo-list', itemsarr)
  app.quit()
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.