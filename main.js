const { app, BrowserWindow } = require('electron/main');
const {ipcMain,dialog} = require('electron');
const path = require('node:path');
const fs = require('node:fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools()
  win.loadURL(`http://localhost:8080?path=${path.join(__dirname, 'preload.js')}`)

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('saveFileData', async (event,ext,data)=>{
  const save = await dialog.showSaveDialog({
    title:'保存',
    defaultPath:'',
    properties:['saveFile'],
    filters:[{
      name:'file',extensions:[ext]
    }]
  });
  const fileDatas = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  const fd = fs.openSync(save.filePath,'w');
  fs.writeFileSync(fd,Buffer.from(fileDatas[2],'base64'));
  fs.closeSync(fd);
})
