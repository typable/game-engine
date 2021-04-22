import Sprite from './sprite.js';
import { scaleCanvas } from '../util/canvas.js';

export default class Spritesheet extends Sprite {
	constructor(path, width, height) {
		super(path);
		this.width = width;
		this.height = height || width;
		this.sprites = [];
	}
	async load() {
		await super.load();
		const {width, height} = this.image;
		if(width % this.width !== 0 || height % this.height !== 0) {
			throw new Error(`Invalid dimension ${this.width}x${this.height} for spritesheet '${this.path}'!`);
		}
		this.sprites = new Array(parseInt(width / this.width) * parseInt(height / this.height));
		const canvas = document.createElement('canvas');
		scaleCanvas(canvas, this.width, this.height);
		const g = canvas.getContext('2d');
		g.imageSmoothingEnabled = false;
		for(let i = 0; i < this.sprites.length; i++) {
			const y = parseInt(i / (width / this.width));
			const x = parseInt(i % (width / this.width));
			g.clearRect(0, 0, this.width, this.height);
			g.drawImage(this.image, -x * this.width, -y * this.height, width, height);
			const sprite = new Sprite(canvas.toDataURL('image/png'));
			await sprite.load();
			this.sprites[i] = sprite;
		}
	}
	all() {
		return this.sprites;
	}
}
