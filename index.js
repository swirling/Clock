var remote = require('remote');
var canvasBuffer = require('electron-canvas-to-buffer');
var nativeImage = require('electron').nativeImage;
var ipcRenderer = require('electron').ipcRenderer;
// remote.getCurrentWindow().toggleDevTools();
// var countFunc = remote.getGlobal('sharedObject').countFunc
var btn = document.querySelector('.test');
var countDown = document.querySelector('.count');
var start = -Math.PI / 2;
var count;
var cx = 20, cy = 20, radius = 20, startangle = start, endangle = start;
var path = require('path');
var options = {
  title: 'Time is up',
  body: ''
};
ipcRenderer.on('asynchronous-reply', function (event, arg) {
  reRender(arg); // prints "pong"
});
btn.addEventListener('click', createImg, false);
function reRender (angle) {
  endangle = endangle + (angle) * 2 * Math.PI;
  createImg();
}
function createImg (ev) {
  if (ev) {
    endangle = start;
    remote.getCurrentWindow().hide();
  }
  count = countDown.value * 6;
  var canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  var context = canvas.getContext('2d');
  context.moveTo(cx, cy);
  context.arc(cx, cy, radius, startangle, endangle);
  context.lineTo(cx, cy);
  if (endangle >= 3 / 2 * Math.PI) {
    new Notification(options.title, options);
  // context.strokeStyle="#ff0000";
  }
  context.stroke(); // or context.fill()
  // context.scale(0.5, 0.5);
  var buffer = canvasBuffer(canvas, 'image/png');
  // var img = nativeImage.createFromBuffer(buffer).toDataURL();
  ipcRenderer.send('asynchronous-message', buffer, count, endangle);
}
