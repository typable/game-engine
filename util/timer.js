export default class Timer {
	constructor(step) {
		this.time = 0;
		this.step = step || 1;
	}
	count() {
		if(this.time >= 1) {
			this.time = 0;
			return true;
		}
		this.time += 1 / this.step;
		return false;
	}
	reset() {
		this.time = 0;
	}
}
