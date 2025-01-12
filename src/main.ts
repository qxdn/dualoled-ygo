import { app, BrowserWindow, Display, screen } from "electron";
import path from "path";
import started from "electron-squirrel-startup";

declare const FRONT_VITE_DEV_SERVER_URL: string;
declare const FRONT_VITE_NAME: string;
declare const BACK_VITE_DEV_SERVER_URL: string;
declare const BACK_VITE_NAME: string;

const DEBUG = false;
const WIDTH = 1394;
const HEIGHT = 2031;
const RADIO = WIDTH / HEIGHT;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const computeWH = (width: number, height: number) => {
  if (width < height) {
    return {
      width: width,
      height: width / RADIO,
    };
  }
  return {
    width: height * RADIO,
    height: height,
  };
};

const createWindow = (display: Display, debug = false) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    fullscreen: !debug,
  });

  // and load the index.html of the app.
  if (FRONT_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(FRONT_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${FRONT_VITE_NAME}/index.html`)
    );
  }

  if (debug) {
    mainWindow.webContents.openDevTools();
  }
};

// 副屏
const createSecondWindow = (display: Display, debug = false) => {
  if (!display) {
    return;
  }
  const secondWindow = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: debug,
    },
    frame: false,
    fullscreen: !debug,
  });

  if (BACK_VITE_DEV_SERVER_URL) {
    secondWindow.loadURL(BACK_VITE_DEV_SERVER_URL);
  } else {
    secondWindow.loadFile(
      path.join(__dirname, `../renderer/${BACK_VITE_NAME}/index.html`)
    );
  }

  if (debug) {
    secondWindow.webContents.openDevTools();
  }
};

const init = () => {
  const displays: Display[] = screen.getAllDisplays();
  const bfm: Display[] = [];
  displays.forEach((display) => {
    if (display.label.includes("BF060YKM")) {
      bfm.push(display);
    }
  });
  createWindow(bfm[0], DEBUG);
  createSecondWindow(
    bfm.length >= 2 ? bfm[1] : screen.getPrimaryDisplay(),
    DEBUG
  );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", init);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    init();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
