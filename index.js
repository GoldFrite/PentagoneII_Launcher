// Importations
const { app, ipcMain, BrowserWindow, shell } = require("electron");
const path = require("path");
// --------------------

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    menu: false,
    title: "Pentagone II Launcher",
    icon: path.join(__dirname, "./assets/images/ICON_ROND/PentagoneII-IconLogo-Blanc_RondBleu.png"),
    resizable: true,
    width: 1300,
    height: 750,
    minWidth: 1250,
    minHeight: 650,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      webSecurity: true,
      contextIsolation: false
    },
  });


  mainWindow.loadFile(path.join(__dirname, "./index.html")); //        /!\ A MODIFIER /!\

  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on('new-window', function (e, url) { // Ouvrir les URL dans le navigateur
    if ('file://' === url.substr(0, 'file://'.length)) {
      return;
    }
    e.preventDefault();
    shell.openExternal(url);
  });

}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});

ipcMain.on("quit", () => {
  app.quit()
})

ipcMain.on("noLogged", () => {
  mainWindow.loadFile(path.join(__dirname, "login.html"))
})

ipcMain.on("login", () => {
  mainWindow.loadFile(path.join(__dirname, "app.html"))
})

ipcMain.on("play", (event, data) => {
  mainWindow.loadFile(path.join(__dirname, "launch.html"))
    .then(function () {
      event.sender.send("data", { appData: app.getPath("appData"), })
    })

})

ipcMain.on("logout", (event, user) => {
  mainWindow.loadFile(path.join(__dirname, "login.html"))
})

ipcMain.on("loadingLauncher", () => {
  mainWindow.loadFile(path.join(__dirname, "loading.html"))
})

ipcMain.on("news", () => {
  mainWindow.loadFile(path.join(__dirname, "news.html"))
})

ipcMain.on("diapo", () => {
  mainWindow.loadFile(path.join(__dirname, "diapo.html"))
})

ipcMain.on("settings", () => {
  mainWindow.loadFile(path.join(__dirname, "settings.html"))
})

ipcMain.on("backhome", () => {
  mainWindow.loadFile(path.join(__dirname, "index.html"))
})

ipcMain.on("backapp", () => {
  mainWindow.loadFile(path.join(__dirname, "app.html"))
})

ipcMain.on("quit", () => {
  app.quit();
})