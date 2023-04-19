const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
PI = Math.PI

// dimensions
HEIGHT = 1000
WIDTH = 1000

// Real axis
ctx.beginPath();
ctx.moveTo(0, HEIGHT/2);
ctx.lineTo(WIDTH, HEIGHT/2);
ctx.stroke();

function circle(x, rad) {
        ctx.beginPath();
	ctx.arc(x, HEIGHT/2, rad, 0, 2*PI)
	ctx.fill()
}

function geodesic(x1, x2) {
	mid = (x1+x2)/2
	rad = Math.abs((x1-x2)/2)

	ctx.arc(mid, HEIGHT/2, rad, PI, 2*PI)
	ctx.stroke()
}

function coord(p,q) {
	x = (p/q)
	X= x * WIDTH
	return X
}

function median(p,q, r,s) {
	return [p+r, q+s]
}

function label(x, text) {
	x = x - 5
	y = HEIGHT/2 + 20

	ctx.font = "10px serif";
	ctx.fillText(text,x, y) ;
}

function triangle(p,q,r,s) {
	const [mp, mq] = median(p,q,r,s)
	geodesic(coord(p,q), coord(mp,mq))
	geodesic(coord(r,s), coord(mp,mq))
	geodesic(coord(r,s), coord(p,q))

	circle(coord(p,q), 5)
	label(coord(p,q), p + "/" + q)
	circle(coord(r,s), 5)
	label(coord(r,s), r + "/" + s)
	circle(coord(mp,mq), 5)
	label(coord(mp,mq), mp + "/" + mq)

	return [mp, mq]
}

function randbit() {
	f = Math.random()
	b = Math.floor(f*2)
	return b
}

function random_triangles(p,q,r,s,n) {
	if (n==0) {
		return
	}
	else {
		const [mp, mq] = triangle(p,q,r,s)

		b = randbit()
		if (b==0) {
			random_triangles(p,q,mp,mq,n-1)
		}
		else {
			random_triangles(mp,mq,r,s,n-1)
		}
	}
}

random_triangles(0,1,1,1,4)
