import Sprite from './sprite.js';
import { scaleCanvas } from 'https://git.typable.dev/std/js/canvas.js';

export default class Spritesheet extends Sprite {
	constructor(path, size) {
		super(path);
		this.size = size;
		this.sprites = [];
	}
	async load() {
		await super.load();
		const {width, height} = this.image;
		if(width % this.size !== 0 || height % this.size !== 0) {
			throw new Error(`Invalid size ${this.size} for spritesheet '${this.path}'!`);
		}
		this.sprites = new Array(parseInt(width / this.size) * parseInt(height / this.size));
		const canvas = document.createElement('canvas');
		scaleCanvas(canvas, this.size, this.size);
		const g = canvas.getContext('2d');
		g.imageSmoothingEnabled = false;
		for(let i = 0; i < this.sprites.length; i++) {
			const y = parseInt(i / (width / this.size));
			const x = parseInt(i % (width / this.size));
			g.clearRect(0, 0, this.size, this.size);
			g.drawImage(this.image, -x * this.size, -y * this.size, width, height);
			const sprite = new Sprite(canvas.toDataURL('image/png'));
			await sprite.load();
			this.sprites[i] = sprite;
		}
	}
	all() {
		return this.sprites;
	}
}
