import { scaleCanvas } from './util.js';

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