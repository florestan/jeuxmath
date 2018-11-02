debug= true;

myGameArea.canvas.addEventListener('click', function(e) {
	[x,y] = getMousePos(e);
	if (check_point_in_zone(x,y,line1.o())){
		[cx, cy] = line1.sym( box.cx(), box.cy());
		box.set_c(cx, cy);
	};

	if (line2.is_in(x,y)){
	// if (check_point_in_zone(x,y,line2.o())){
		[cx, cy] = line2.sym( box.cx(), box.cy());
		box.set_c(cx, cy);
	};

	if (check_in_zone(box.o(), box3.o())) {
		document.getElementById("win")
		.textContent="Bravo!";
	}
	else {
		document.getElementById("win")
			.textContent="pas bravo...";
	};
	updateGameArea();
});

myGameArea.canvas.addEventListener('mousemove', function (e) {
	[x,y] = getMousePos(e);
	if (check_point_in_zone(x,y,line1.o())){
		line1.color = "yellow"
	}
	else if (line2.is_in(x,y)){
	// else if (check_point_in_zone(x,y,line2.o())){
		line2.color = "yellow"
	}
	else {
		line1.color = line1.original_color;
		line2.color = line2.original_color;
	};
	if (debug){
	document.getElementById("pos")
		.textContent=x+","+y+" "+line2.dist(x,y);
	};
	updateGameArea()

});
function startGame() {
	line1 = new componentVertLine(10, "blue", 300);
	line2 = new componentLine(10, "purple",
		300, 300, 1, -1);

	box = new component(30, 30, "blue", 10, 210);
	zone = {'x':555, 'y':355, 'w':50, 'h':50};

	box3 = new component(zone.w, zone.h, "gray", zone.x,
		zone.y);
	myGameArea.start();
	myGameArea.canvas.style.cursor = "pointer";
	updateGameArea();
}

function updateGameArea() {
	myGameArea.clear();
	line1.update();
	line2.update();
	box3.update();
	box.update();
}
