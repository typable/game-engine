import { scaleCanvas } from './canvas.js';
import * as Collision from './collision.js';

export class Game {
	constructor(width, height, { fps } = {}) {
		this.width = width || 900;
		this.height = height || 600;
		this.fps = 1000 / (fps || 60);
		this.then = Date.now();
		this.canvas = document.createElement('canvas');
		scaleCanvas(this.canvas, this.width, this.height);
		this.g = this.canvas.getContext('2d');
	}
	start() {
		requestAnimationFrame(this.loop.bind(this));
		this.update();
		this.g.save();
		this.render(this.g);
		this.g.restore();
	}
	loop() {
		requestAnimationFrame(this.loop.bind(this));
		this.now = Date.now();
		this.elapsed = this.now - this.then;
		if(this.elapsed > this.fps) {
			this.then = this.now - (this.elapsed % this.fps);
			this.update();
			this.g.save();
			this.render(this.g);
			this.g.restore();
		}
	}
	update() {
		// empty
	}
	render() {
		this.g.clearRect(0, 0, this.width, this.height);
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
		scaleCanvas(this.canvas, this.width, this.height);
	}
}

export class Group {
	constructor() {
		this.items = [];
	}
	update() {
		for(let item of this.items) {
			item.update();
		}
	}
	render(g) {
		for(let item of this.items) {
			g.save();
			item.render(g);
			g.restore();
		}
	}
	collide() {
		for(const i of this.items) {
			i.items = [];
			i.collided = false;
		}
		const duplicate = [];
		for(const a of this.items) {
			for(const b of this.items) {
				if(!duplicate.includes(b)) {
					if(a !== b) {
						let collided = false;
						if(a.shape instanceof Shape.Rect && b.shape instanceof Shape.Rect) {
							collided = Collision.collideRect(a, b);
						}
						else if(a.shape instanceof Shape.Circle && b.shape instanceof Shape.Circle) {
							collided = Collision.collideCircle(a, b);
						}
						else {
							collided = Collision.collideRectAndCircle(a, b);
						}
						if(!a.collided) {
							a.collided = collided;
						}
						if(!b.collided) {
							b.collided = collided;
						}
						if(collided) {
							if(!a.items.includes(b)) {
								a.items.push(b);
							}
							if(!b.items.includes(a)) {
								b.items.push(a);
							}
						}
					}
				}
			}
			duplicate.push(a);
		}
	}
	add(item) {
		this.items.push(item);
	}
	[Symbol.iterator]() {
		return this.items.values();
	}
}

export class Surface {
	constructor(x, y, shape) {
		this.x = x;
		this.y = y;
		this.shape = shape;
	}
	update() {
		// empty
	}
	render() {
		// empty
	}
}

class Rect {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
}

class Circle {
	constructor(radius) {
		this.radius = radius;
	}
}

export const Shape = { Rect, Circle };