myGameArea.canvas.addEventListener('mousedown', function(e) {
	[x,y] = getMousePos(e);
	[box3.x, box3.y] = [x,y];
	[box3.width, box3.height] = [0,0];
	updateGameArea();
});
myGameArea.canvas.addEventListener('mouseup', function(e) {
	[x,y] = getMousePos(e);
	[box3.width, box3.height] = [x-box3.x,y-box3.y];
	document.getElementById("rect")
		.textContent=x+","+y+" "+box3.width+","+box3.height;
	updateGameArea();
});

myGameArea.canvas.addEventListener('mousemove', function (e) {
	[x,y] = getMousePos(e);
	document.getElementById("pos")
		.textContent=x+","+y;
	updateGameArea()

});
function startGame() {
	zone = {'x':800-100, 'y':200, 'w':50, 'h':50};

	box3 = new component(zone.w, zone.h, "gray", zone.x,
		zone.y);
	myGameArea.start();
	myGameArea.canvas.style.cursor = "pointer";
	updateGameArea();
}

function updateGameArea() {
	myGameArea.clear();
	box3.update();
}
