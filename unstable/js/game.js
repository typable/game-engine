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
		this.events = [];
	}
	start() {
		requestAnimationFrame(this.loop.bind(this));
		this.update();
		this.render(this.g);
	}
	loop() {
		requestAnimationFrame(this.loop.bind(this));
		this.now = Date.now();
		this.elapsed = this.now - this.then;
		if(this.elapsed > this.fps) {
			this.then = this.now - (this.elapsed % this.fps);
			for(const event of this.events) {
				if(this['on' + event.type]) {
					this['on' + event.type](event);
				}
			}
			this.update();
			this.render(this.g);
			this.events.length = 0;
		}
	}
	update() {
		// nothing
	}
	render() {
		this.g.clearRect(0, 0, this.width, this.height);
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
		scaleCanvas(this.canvas, this.width, this.height);
	}
	bindEvent(element, type) {
		element['on' + type] = event => this.events.push(event);
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
			item.render(g);
		}
	}
	causeEvent(type, events) {
		for(let item of this.items) {
			item.causeEvent(type, events);
		}
	}
	collide() {
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
						if(collided) {
							if(a.oncollide) {
								a.oncollide(b);
							}
							if(b.oncollide) {
								b.oncollide(a);
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
	remove(item) {
		const i = this.items.findIndex(n => n === item);
		if(i !== -1) {
			this.items.splice(i, 1);
		}
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
		// nothing
	}
	render(g) {
		if(this.shape instanceof Shape.Rect) {
			g.beginPath();
			g.rect(this.x, this.y, this.shape.width, this.shape.height);
			g.stroke();
		}
		if(this.shape instanceof Shape.Circle) {
			g.beginPath();
			g.arc(this.x, this.y, this.shape.radius, 2 * Math.PI, 0);
			g.stroke();
		}
	}
	causeEvent(type, events) {
		if(this['on' + type]) {
			for(const event of events) {
				if(event.type === type) {
					this['on' + type](event);
				}
			}
		}
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