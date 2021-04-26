import GameEngine from './game-engine.js';
import { scaleCanvas } from './util/canvas.js';

export default class Game {
	constructor(width, height, { fps } = {}) {
		this.width = width || 900;
		this.height = height || 600;
		this.fps = 1000 / (fps || 60);
		this.then = Date.now();
		this.running = false;
		this.canvas = document.createElement('canvas');
		scaleCanvas(this.canvas, this.width, this.height);
		this.g = this.canvas.getContext('2d');
		this.g.imageSmoothingEnabled = false;
		this.events = [];
		this.sprites = [];
		GameEngine.instance = this;
	}
	async start() {
		for(const sprite of this.sprites) {
			await sprite.load();
		}
		this.running = true;
		if(this.oninit) {
			this.oninit();
		}
		requestAnimationFrame(this.loop.bind(this));
		this.update();
		this.render(this.g);
	}
	quit() {
		this.running = false;
		if(this.onquit) {
			this.onquit();
		}
	}
	loop() {
		try {
			if(this.running) {
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
					this.events = [];
				}
			}
		}
		catch(error) {
			console.error(error);
			this.running = false;
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
		this.g.imageSmoothingEnabled = false;
	}
	bindEvent(element, type) {
		element['on' + type] = event => this.events.push(event);
	}
	loadSprite(sprite) {
		this.sprites.push(sprite);
	}
}
