function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;    
	this.cx = function(){ return this.x + width/2};
	this.cy = function(){ return this.y + height/2};
	this.set_c = function(cx, cy) {
		this.x = cx - width/2;
		this.y = cy - height/2;
	};
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.o = function () {
		return {'x':this.x, 'y':this.y, 'w':this.width, 'h':this.height}
		;
	}
}

function componentVertLine(width, color, x) {
	this.width = width;
	this.x = x;
	this.color = color;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, 0, this.width, myGameArea.canvas.height);
	};
	this.o = function () {
		return {'x':this.x, 'y':0, 'w':this.width, 'h':myGameArea.canvas.height}
		;
	};
	this.sym = function (x, y) {
		sym_x = x + 2*(this.x-x);
		return [sym_x, y];
	}
}

function joinLine(height, color, b1, b2) {
	this.b1 = b1
	this.b2 = b2
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		[startx, starty] = middle(b1.o());
		[endx, endy] = middle(b2.o());
		ctx.fillRect(startx, starty-height/2, endx-startx, endy-starty+height/2);
	}
}

function middle(o) {
	x = o.x + o.h/2;
	y = o.y + o.w/2;
	return [x,y];
};

function check_in_zone(o, zone) {
	is_in = (zone.x <= o.x )
		&&(zone.y <= o.y )	
		&&(zone.x+zone.w >= o.x+o.w )	
		&&(zone.y+zone.h >= o.y+o.h )	
	;
	return is_in;
}
function check_point_in_zone(x, y, zone) {
	is_in = (zone.x <= x )
		&&(zone.y <= y )	
		&&(zone.x+zone.w >= x)	
		&&(zone.y+zone.h >= y)	
	;
	return is_in;
} 

function getMousePos(evt) {
	var rect = myGameArea.canvas.getBoundingClientRect();
	return [
	evt.clientX - rect.left,
	evt.clientY - rect.top
	];
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 800;
		this.canvas.height = 500;
		this.canvas.style.cursor = "none"; //hide the original cursor
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		updateGameArea();
	}, 
	clear : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
