const socket = io.connect('http://localhost:3000');

socket.on('image', image => {
	const imageElm = document.getElementById('image');
	imageElm.src = `data:image/jpeg;base64, ${image}`
})
