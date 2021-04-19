import { scaleCanvas } from '../util/canvas.js';

const cache = new Map();
const canvas = document.createElement('canvas');
const g = canvas.getContext('2d');

export default class Bitmap {
	static from(sprite, width, height) {
		const key = `${sprite.path}:${width}x${height}`;
		if(!cache.has(key)) {
			cache.set(key, new Bitmap(sprite.image, width, height));
		}
		return cache.get(key);
	}
	constructor(image, width, height) {
		this.image = image;
		this.width = width;
		this.height = height;
		scaleCanvas(canvas, width, height);
		g.imageSmoothingEnabled = false;
		g.drawImage(this.image, 0, 0, width, height);
		const {data} = g.getImageData(0, 0, width, height);
		this.map = [];
		let row = [];
		for(let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			const a = data[i + 3];
			if((i / 4) % width === 0 && Math.floor(i / 4 / width) > 0) {
				this.map.push(row);
				row = [];
			}
			row.push([r, g, b, a]);
		}
		this.map.push(row);
	}
	get(x, y) {
		if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return [];
		}
		return this.map[y][x];
	}
}