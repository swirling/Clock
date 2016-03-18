var menubar = require('menubar');
var canvasBuffer = require('electron-canvas-to-buffer');
var nativeImage = require('electron').nativeImage;
var ipcMain = require('electron').ipcMain;
var mb = menubar({
  width: 100,
  height: 100
});
var t = null;

mb.on('ready', function () {
  console.log('loaded');
});
ipcMain.on('asynchronous-message', function (event, arg, count) {
  var img = nativeImage.createFromBuffer(arg, 2);
  mb.tray.setImage(img);
  t && clearTimeout(t);
  t = setTimeout(function () {
    event.sender.send('asynchronous-reply', 1 / count);
}, 10000);
});

/*
function countDown (count) {
  mb.tray.setTitle(count);
  t && clearInterval(t);
  t = setInterval(function () {
    count = count - 1;
    mb.tray.setTitle(count+"");
}, 6000);
}
var electron = require('electron');
  var app = electron.app;
  var Menu = electron.Menu;
  var Tray = electron.Tray;

  var appIcon = null;
  app.on('ready', function(){
    appIcon = new Tray("/Users/ly/toys/menubar/example/IconTemplate.png");
    var contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ]);
    appIcon.setToolTip('This is my application.');
    appIcon.setContextMenu(contextMenu);
  });
*/
