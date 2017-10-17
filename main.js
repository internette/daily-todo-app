const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const process = require("process");
const randtoken = require('rand-token');

// Initialize server
const firebase = require("firebase"),
  firebase_config_module = require("dailytodo-firebase-config"),
  firebase_config = firebase_config_module.dailytodo_firebase_config(),
  firebase_login = firebase_config_module.dailytodo_firebase_login();
firebase.initializeApp(firebase_config);
firebase
  .auth()
  .signInWithEmailAndPassword(firebase_login.username, firebase_login.password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
const db = firebase.database();

const Config = require("electron-config");
const config = new Config();
const { ipcMain, ipcRenderer } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow,
  winsize = config.get("winsize"),
  winWidth = 0,
  winHeight = 0,
  itemsarr,
  todos = config.get("todo-list"),
  isOnTop = config.get("is-on-top"),
  nextId = config.get("next-id"),
  sentItems = {},
  icon_filename = "",
  text_notifications = config.get("text-notifications"),
  email_notifications = config.get("email-notifications"),
  settings = config.get("settings") || null;
  // config.set('settings', null)

const createWindow = () => {
  // Create the browser window.
  winWidth = winsize ? config.get("winsize.width") : 800;
  winHeight = winsize ? config.get("winsize.height") : 600;
  itemsarr = todos !== undefined && todos.length > 0 ? todos : [];
  isOnTop = isOnTop !== undefined ? isOnTop : false;
  nextId = nextId && itemsarr.length > 0 ? nextId : 0;
  icon_filename = process.platform === "darwin" ? "icon.png" : "icon.icns";

  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: 300,
    minHeight: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: isOnTop,
    icon: path.join(__dirname, "src", "icons", icon_filename)
  });
  mainWindow.component_type = "app";
  mainWindow.setResizable(true);
  // un-comment this if you like to keep the same aspect ratio when
  // mainWindow.setAspectRatio(1.3)
  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (process.env.ELECTRON_ENABLE_LOGGING) {
    // Set ReactDevTools location based on OS
    let extension_path = "";
    if (process.platform === "darwin") {
      extension_path = path.join(
        "/Users",
        "acjanus",
        "Library",
        "Application Support",
        "Google",
        "Chrome",
        "Default",
        "Extensions",
        "fmkadmapgofadopljbjfkapdkoienihi",
        "2.1.9_0"
      );
    } else {
      extension_path = path.join(
        "C:",
        "Users",
        "Antoinette",
        "AppData",
        "Local",
        "Google",
        "Chrome",
        "User Data",
        "Default",
        "Extensions",
        "fmkadmapgofadopljbjfkapdkoienihi",
        "2.1.9_0"
      );
    }
    BrowserWindow.addDevToolsExtension(extension_path);
  }
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("minimize", function(event, args) {
  mainWindow.minimize();
});

ipcMain.on("new-window", function(event, args) {
  // var win = new BrowserWindow({width: 800, height: 600, frame: false, transparent: true})
  var win = new BrowserWindow({
    width: 500,
    frame: false,
    transparent: true,
    useContentSize: true
  });
  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  win.component_type = args.type;
  // win.webContents.openDevTools();
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
});

ipcMain.on("get-settings", (event, args) => {
  new Promise(function(resolve, reject){
    let counter = 0;
    if(settings !== null){
      ['notify_by_email', 'notify_by_text'].forEach(function(param){
        const extended_type_plural = param === 'notify_by_text' ? 'phone_numbers' : 'email_addresses';
        const extended_type = param === 'notify_by_text' ? 'phone_number' : 'email_address';
        if(settings.hasOwnProperty(param)){
          if(settings[param]){
            const dbRef = db.ref("/");
            dbRef.child(extended_type_plural).once("value", function(snapshot){
              const data = snapshot.val();
              if(data !== null){
                counter += 1;
                if(counter === 2){
                  resolve('complete')
                }
              } else {
                var type = extended_type.split('_')[0];
                delete settings[param];
                delete settings[extended_type];
                delete settings[type + '_notification_hour'];
                delete settings[type + '_notification_minute'];
                delete settings[type + '_notification_tod'];
                delete settings[type + '_notification_timezone'];
                counter += 1;
                if(counter === 2){
                  resolve('complete')
                }
              }
            });
          } else {
            counter += 1;
          }
        } else {
          counter += 1;
        }
      })
    } else {
      counter = 2;
    }
    if(counter === 2){
      resolve('complete')
    }
  }).then(function(){
    event.sender.send("set-settings", settings);
  })
});

ipcMain.on("get-items", (event, args) => {
  sentItems = {
    todoItems: itemsarr,
    nextId: nextId
  };
  event.sender.send("send-items", sentItems);
});

ipcMain.on("add-to-do", (event, args) => {
  args.completeDate = null;
  itemsarr.push(args);
  nextId = itemsarr.length === 0 ? 1 : args.id + 1;
  config.set("next-id", nextId);
  sentItems.nextId = nextId;
  sentItems.todoItems = itemsarr;
  config.set("todo-list", itemsarr);
  event.sender.send("send-items", sentItems);
});

ipcMain.on("completed-action", (event, args) => {
  itemsarr.filter((item, index) => {
    if (item.id === args) {
      itemsarr[index].complete = !itemsarr[index].complete;
      itemsarr[index].completeDate = itemsarr[index].complete
        ? new Date()
        : null;
      sentItems.todoItems = itemsarr;
      sentItems.updateType = "complete";
      config.set("todo-list", itemsarr);
      event.sender.send("item-action", sentItems);
    }
  });
  if(settings !== null && settings.notify_by_text){
    const dbRef = db.ref("/");
    const extended_type = 'phone_number';
    const extended_type_plural = 'phone_numbers';
    const specificDbRef = db.ref("/" + extended_type_plural);
    dbRef.child(extended_type_plural).once("value", function(snapshot) {
      let userData = snapshot.val();
      if (userData !== null) {
        const curr_user_key = Object.keys(userData).filter(function(key){
          if(userData[key].phone_number === settings.phone_number){
            return key
          }
        });
        const data_to_update = userData[curr_user_key];
        data_to_update.incomplete_items_count = itemsarr.filter(function(item){
          if(!item.complete){
            return item;
          }
        }).length;
        let obj_to_update = {};
        obj_to_update[curr_user_key] = data_to_update;
        specificDbRef.update(obj_to_update);
      }
    });

  }
});

function getDataToAdd(passedin_settings, type) {
  const incomplete_items = itemsarr.filter(function(item) {
    if (!item.complete) {
      return item;
    }
  });
  if (/pm/i.test(passedin_settings[type + "_notification_tod"])) {
    passedin_settings[type + "_notification_hour"] = (parseInt(
      passedin_settings[type + "_notification_hour"]
    ) + 12).toString();
  }
  let curr_date = new Date();
  curr_date.setHours(parseInt(passedin_settings[type + "_notification_hour"]));
  curr_date.setMinutes(
    parseInt(passedin_settings[type + "_notification_minute"])
  );
  let data_to_add = {
    cron_time: {
      hour: curr_date.getUTCHours(),
      minute: curr_date.getUTCMinutes(),
      time_zone: passedin_settings[type + "_notification_timezone"],
      pid: null
    },
    incomplete_items_count: incomplete_items.length
  };
  switch (type) {
    case "phone":
      data_to_add["phone_number"] = passedin_settings.phone_number;
      break;
    case "email":
      data_to_add["email_address"] = passedin_settings.email_address;
      break;
  }
  return data_to_add;
}

function uploadToDb(passedin_settings, type) {
  let extended_type = "",
    extended_type_plural = "",
    notify_method = "";
  switch (type) {
    case "phone":
      extended_type = "phone_number";
      extended_type_plural = "phone_numbers";
      notify_method = "notify_by_text";
      break;
    case "email":
      extended_type = "email_address";
      extended_type_plural = "email_addresses";
      notify_method = "notify_by_email";
      break;
  }
  const dbRef = db.ref("/");
  const specificDbRef = db.ref("/" + extended_type_plural);
  const data_to_add = getDataToAdd(passedin_settings, type);
  data_to_add['SHA'] = randtoken.generate(16);
  dbRef.child(extended_type_plural).once("value", function(snapshot) {
    let userData = snapshot.val();
    if (userData === null) {
      if (passedin_settings[notify_method]) {
        specificDbRef.push(data_to_add);
      }
    } else {
      let doesExist = false,
        existingId = "";
      for (var i = 0; i < Object.keys(userData).length; i++) {
        const current_obj = Object.keys(userData)[i];
        if (
          userData[current_obj][extended_type] === data_to_add[extended_type]
        ) {
          existingId = current_obj;
          doesExist = true;
        }
      }
      if (doesExist) {
        let new_settings = {};
        if (passedin_settings[notify_method]) {
          new_settings[existingId] = data_to_add;
          specificDbRef.update(new_settings);
        } else {
          specificDbRef.child(existingId).remove();
        }
      } else {
        if (passedin_settings[notify_method]) {
          specificDbRef.push(data_to_add);
        }
      }
    }
  });
}

ipcMain.on("updated-prefs", (event, args) => {
  const passedin_settings = args;
  uploadToDb(passedin_settings, "phone");
  uploadToDb(passedin_settings, "email");
  settings = passedin_settings;
  config.set("settings", settings);
  event.sender.send("set-settings", settings);
});

ipcMain.on("updated-details", (event, args) => {
  itemsarr.filter((item, index) => {
    if (item.id === args.id) {
      item.details = args.details;
      sentItems.todoItems = itemsarr;
      sentItems.updateType = "set-details";
      config.set("todo-list", itemsarr);
      event.sender.send("set-details", sentItems);
    }
  });
});
//  Delete all tasks on click
ipcMain.on("delete-tasks", (event, args) => {
  itemsarr = [];
  config.set("todo-list", itemsarr);
  sentItems = {
    todoItems: itemsarr,
    nextId: nextId
  };
  event.sender.send("send-items", sentItems);
});
// Reset all tasks
ipcMain.on("reset-tasks", (event, args) => {
  itemsarr.forEach(item => {
    item.complete = false;
    item.completeDate = null;
  });
  config.set("todo-list", itemsarr);
  sentItems = {
    todoItems: itemsarr,
    nextId: nextId
  };
  if(settings !== null && (settings.notify_by_text || settings.notify_by_email) ){
    const dbRef = db.ref("/");
    ['notify_by_email', 'notify_by_text'].forEach(function(param){
      const extended_type = param === 'notify_by_email' ? 'email_address' : 'phone_number',
      extended_type_plural = param === 'notify_by_email' ? 'email_addresses' : 'phone_numbers';
      if(settings[param]){
        const specificDbRef = db.ref("/" + extended_type_plural);
        dbRef.child(extended_type_plural).once("value", function(snapshot) {
          let userData = snapshot.val();
          if (userData !== null) {
            const users = Object.keys(userData)[extended_type_plural];
            users.filter(function(user){
              const curr_user_key = Object.keys(userData).filter(function(key){
                if(userData[key][extended_type] === settings[extended_type]){
                  return key
                }
              });
              const data_to_update = userData[curr_user_key];
              data_to_update.incomplete_items_count = itemsarr.length;
              let obj_to_update = {};
              obj_to_update[curr_user_key] = data_to_update;
              specificDbRef.update(obj_to_update);
            })
          }
        });
      }
    })
  }
  event.sender.send("reset-all", sentItems);
});

// Resets only tasks that are old
ipcMain.on("reset-old-tasks", (event, args) => {
  if (itemsarr.length > 0) {
    var today_date_in_sec = new Date().getTime() / 1000;
    var today_date_in_days = today_date_in_sec / 60 / 60 / 24;
    itemsarr.forEach(item => {
      if (item.completeDate !== null) {
        var item_date_in_sec = new Date(item.completeDate).getTime() / 1000;
        var item_date_in_days = item_date_in_sec / 60 / 60 / 24;
        if (
          today_date_in_days - item_date_in_days > 0 &&
          today_date_in_sec - item_date_in_sec > 5
        ) {
          item.complete = false;
          item.completeDate = null;
        }
      }
    });
  }

  config.set("todo-list", itemsarr);
  sentItems = {
    todoItems: itemsarr,
    nextId: nextId
  };
  event.sender.send("reset-all", sentItems);
});

ipcMain.on("delete-item", (event, args) => {
  itemsarr.filter((item, index) => {
    if (item.id === args.id) {
      itemsarr.splice(index, 1);
      config.set("todo-list", itemsarr);
      sentItems.todoItems = itemsarr;
      sentItems.updateType = "delete";
      event.sender.send("send-items", sentItems);
    }
  });
});
ipcMain.on("app-on-top", (event, args) => {
  isOnTop = !isOnTop;
  config.set("is-on-top", isOnTop);
  mainWindow.setAlwaysOnTop(isOnTop);
  event.sender.send("send-top-status", isOnTop);
});
ipcMain.on("get-top-status", function(event, args) {
  event.sender.send("send-top-status", isOnTop);
});

ipcMain.on("app-close", (event, args) => {
  winHeight = mainWindow.getSize()[1];
  winWidth = mainWindow.getSize()[0];
  config.set("winsize.height", winHeight);
  config.set("winsize.width", winWidth);
  config.set("todo-list", itemsarr);
  app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
