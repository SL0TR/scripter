const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
// const textract = require("textract");
// const os = require("os");
const log = require("electron-log");
var filereader = require("./filereader");
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("toMain", (event, filepath) => {
  try {
    // textract.fromFileWithPath(
    //   filepath,
    //   { preserveLineBreaks: true },
    //   function (error, text) {
    //     if (error) {
    //       log.error(error);
    //       return;
    //     }
    //     win.webContents.send("fromMain", {
    //       oSPlatform: os.platform(),
    //       text,
    //     });
    //   }
    // );

    filereader.extract(filepath).then(function (res, err) {
      if (err) {
        log.error(err);
        console.log(err);
      }

      log.info(res);
    });
  } catch (e) {
    console.log(e, "on error catch");
    log.error(e, "on error catch");
  }
});
