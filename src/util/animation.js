import Timer from './timer.js';

export default class Animation {
	constructor(size, step) {
		this.size = size;
		this.timer = new Timer(step);
		this.frame = 0;
		this.offset = 0;
	}
	count() {
		if(this.timer.count()) {
			if(this.frame === this.size - 1) {
				this.frame = 0;
			}
			else {
				this.frame++;
			}
		}
	}
	reset() {
		this.timer.reset();
		this.frame = 0;
	}
	get(sprites) {
		return sprites[this.offset + this.frame];
	}
}
