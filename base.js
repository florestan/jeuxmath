can_width = 800;
can_height = 500;

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
		ctx.fillRect(this.x, this.y, this.width,
			this.height);
	}
	this.o = function () {
		return {'x':this.x, 'y':this.y, 'w':
			this.width, 'h':this.height}
		;
	}
}

function componentVertLine(width, color, x) {
	this.width = width;
	this.x = x;
	this.original_color = color;
	this.color = color;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x-this.width/2, 0, this.width,
			can_height);
	};
	this.o = function () {
		return {'x':this.x, 'y':0, 'w':this.width,
			'h':can_height}
		;
	};
	this.sym = function (x, y) {
		sym_x = x + 2*(this.x-x);
		return [sym_x, y];
	}
}

function componentHorLine(width, color, y) {
	this.width = width;
	this.y = y;
	this.original_color = color;
	this.color = color;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(0, this.y-this.width/2,
			myGameArea.canvas.width,
			this.width);
	};
	this.o = function () {
		return {'x':0, 'y':this.y,
			'w':myGameArea.canvas.width,
			'h':this.width}
		;
	};
	this.sym = function (x, y) {
		sym_y = y + 2*(this.y-y);
		return [x, sym_y];
	}
}
function componentLine(width, color, x, y, a,b) {
	// x, y -> un point de la droite
	// a,b -> un vecteur directeur
	this.width = width;
	this.y = y;
	this.x = x;
	this.a = a;
	this.b = b;
	this.x_start =
		x + (0-y)*(a/b);
	this.x_finish =
		x + (can_height-y)*(a/b);
	this.original_color = color;
	this.color = color;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x_start, 0);
		ctx.lineTo(this.x_finish,
			can_height
		);
		ctx.lineTo(this.x_finish+this.width,
			can_height
		);
		ctx.lineTo(this.x_start+width, 0);
		ctx.lineTo(this.x_start, 0);
		ctx.fill()
	};
	this.o = function () {
		return {'x':0, 'y':this.y,
			'w':myGameArea.canvas.width,
			'h':this.width}
		;
	};
	this.is_in = function (x, y) {
		norm = (this.a)**2+(this.b)**2;
		ps_temp = (x-this.x)*this.a + (y-this.y)*this.b;
		ps = ps_temp/norm;
		d = 
			(this.x + ps*this.a - x)**2
			+
			(this.y + ps*this.b - y)**2
		;
		is_in = (d <= (this.width)**2)
		;
		return is_in
	};
	this.dist = function (x, y) {
		norm = this.a**2+this.b**2;
		ps_temp = (x-this.x)*this.a + (y-this.y)*this.b;
		ps = ps_temp/norm;
		d = 
			(this.x + ps*this.a - x)**2
			+
			(this.y + ps*this.b - y)**2
		;
		is_in = (d <= this.width**2)
		;
		return d;
	};
	this.sym = function (x, y) {
		norm = (this.a)**2+(this.b)**2;
		ps_temp = (x-this.x)*this.a + (y-this.y)*this.b;
		ps = ps_temp/norm;
		sym_x = 2*(ps*this.a + this.x) - x;
		sym_y = 2*(ps*this.b + this.y) - y;
		return [sym_x, sym_y];
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
		ctx.fillRect(startx, starty-height/2,
			endx-startx, endy-starty+height/2);
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
	var rect = myGameArea.canvas.getBoundingClientRect()
	;
	return [
		evt.clientX - rect.left,
		evt.clientY - rect.top
	];
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = can_width;
		this.canvas.height = can_height;
		this.canvas.style.cursor = "none";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas,
			document.body.childNodes[0]);
		updateGameArea();
	}, 
	clear : function(){
		this.context.clearRect(0, 0,
			this.canvas.width, this.canvas.height);
	}
}
