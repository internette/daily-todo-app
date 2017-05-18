const electron = require('electron')
  // Module to control application life.
const app = electron.app
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const process = require('process')

const Config = require('electron-config')
const config = new Config()
const {ipcMain, ipcRenderer} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, winsize = config.get('winsize'), winWidth = 0, winHeight = 0, 
    itemsarr, todos = config.get('todo-list'), isOnTop = config.get('is-on-top'),
    resetDate = config.get('last-reset-date'), nextId = config.get('next-id'),
    sentItems = {}, icon_filename = ''

const createWindow = ()=> {
  // Create the browser window.
  winWidth = winsize ? config.get('winsize.width') : 800
  winHeight = winsize ? config.get('winsize.height') : 600
  itemsarr = todos !== undefined && todos.length > 0 ? todos : []
  isOnTop = isOnTop !== undefined ? isOnTop : false
  nextId = nextId && itemsarr.length > 0 ? nextId : 0
  resetDate = resetDate === undefined ? new Date() : resetDate
  icon_filename = process.platform === 'darwin' ? 'icon.png' : 'icon.icns'

  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: 300,
    minHeight: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: isOnTop,
    icon: path.join(__dirname, 'src', 'icons', icon_filename)
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
app.on('ready', ()=> {
  if(process.env.ELECTRON_ENABLE_LOGGING){
    // Set ReactDevTools location based on OS
    let extension_path = ''
    if (process.platform === 'darwin'){
      extension_path = path.join('/Users', 'acjanus', 'Library', 'Application Support',
      'Google', 'Chrome', 'Default', 'Extensions', 'fmkadmapgofadopljbjfkapdkoienihi', 
      '2.1.9_0')
    } else {
      extension_path = path.join('C:','Users', 'Antoinette', 'AppData',
      'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Extensions', 
      'fmkadmapgofadopljbjfkapdkoienihi', '2.1.9_0')
    }
    BrowserWindow.addDevToolsExtension(
      extension_path
    )
  }

  setInterval(() =>{
    checkIfMidnight()
  }, 1000)
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const checkIfMidnight = ()=> {
  const currentdate = new Date()
  const offsetHrs = currentdate.getTimezoneOffset() / 60
  let hours = currentdate.getUTCHours() - offsetHrs
  if( hours >= 24 ){ hours -= 24; }
  if( hours < 0 ){ hours += 12; }
  const mins = currentdate.getMinutes()
  const secs = currentdate.getSeconds()
  const _this = this;
  if (hours === 0 && mins === 0 && secs >= 0 && secs <= 1){
    ipcRenderer.send('reset-tasks','')
  }
}

ipcMain.on('get-items', (event, args)=> {
  sentItems = {
    todoItems: itemsarr,
    resetDate: resetDate,
    nextId: nextId
  }
  event.sender.send('send-items', sentItems)
})

ipcMain.on('add-to-do', (event, args)=> {
  itemsarr.push(args)
  nextId = itemsarr.length === 0 ? 1 : args.id + 1
  config.set('next-id', nextId)
  sentItems.nextId = nextId
  sentItems.todoItems = itemsarr
  config.set('todo-list', itemsarr)
  event.sender.send('send-items', sentItems)
})
ipcMain.on('completed-action', (event, args)=> {
  itemsarr.filter((item, index)=> {
    if(item.id === args){
      itemsarr[index].complete = !itemsarr[index].complete
      sentItems.todoItems = itemsarr
      sentItems.updateType = 'complete'
      config.set('todo-list', itemsarr)
      event.sender.send('item-action', sentItems)
    }
  })
})
ipcMain.on('updated-details', (event, args)=> {
  itemsarr.filter((item, index)=> {
    if(item.id === args.id){
      itemsarr[index].details = args.details
      sentItems.todoItems = itemsarr
      sentItems.updateType = 'set-details'
      config.set('todo-list', itemsarr)
      event.sender.send('set-details', sentItems)
    }
  })
})
//  Delete all tasks on click
ipcMain.on('delete-tasks', (event, args)=> {
  itemsarr = []
  config.set('todo-list', itemsarr)
  resetDate = new Date()
  config.set('last-reset-date', resetDate)
  sentItems = {
    todoItems: itemsarr,
    resetDate: resetDate,
    nextId: nextId
  }
  event.sender.send('send-items', sentItems)
})
// Reset all tasks on click to incomplete
ipcMain.on('reset-tasks', (event, args)=> {
  itemsarr.forEach((item)=> {
    item.complete = false
  })
  config.set('todo-list', itemsarr)
  resetDate = new Date()
  config.set('last-reset-date', resetDate)
  sentItems = {
    todoItems: itemsarr,
    resetDate: resetDate,
    nextId: nextId
  }
  event.sender.send('reset-all', sentItems)
})
ipcMain.on('delete-item', (event, args)=> {
  itemsarr.filter((item, index)=> {
    if(item.id === args.id){
      itemsarr.splice(index, 1)
      config.set('todo-list', itemsarr)
      sentItems.todoItems = itemsarr
      sentItems.updateType = 'delete'
      event.sender.send('send-items', sentItems)
    }
  })
})
ipcMain.on('app-on-top', (event, args)=> {
  isOnTop = !isOnTop
  config.set('is-on-top', isOnTop)
  mainWindow.setAlwaysOnTop(isOnTop)
  event.sender.send('send-top-status', isOnTop)
})
ipcMain.on('get-top-status', function(event, args){
  event.sender.send('send-top-status', isOnTop)
})

ipcMain.on('app-close', (event, args)=> {
  winHeight = mainWindow.getSize()[1]
  winWidth = mainWindow.getSize()[0]
  config.set('winsize.height', winHeight)
  config.set('winsize.width', winWidth)
  config.set('todo-list', itemsarr)
  app.quit()
})

app.on('activate', ()=> {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.