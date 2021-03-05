import { scaleCanvas } from './canvas.js';

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
		this.render(this.g),
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
			this.render(this.g),
			this.g.restore();
		}
	}
	update() {
		// empty
	}
	render() {
		this.g.clearRect(0, 0, this.width, this.height);
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
	add(item) {
		this.items.push(item);
	}
	get() {
		return this.items;
	}
}

export class Surface {
	constructor(x, y, width, height) {
		this.rect = new Rect(x, y, width, height);
	}
	update() {
		// empty
	}
	render() {
		// empty
	}
}

export class Rect {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}