const express = require('express');
const cv = require('opencv4nodejs');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 400);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 400);

app.get('*', (req, res) => {
	res.sendFile(__dirname+'/public/index.html');
});

const FPS = 30;
setInterval(() => {
	const frame = wCap.read();
	const image = cv.imencode('.jpg', frame).toString('base64');
	io.emit('image', image)
}, 1000 / FPS)

module.exports = server;
