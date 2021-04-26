export default class Group {
	constructor() {
		this.items = [];
	}
	update() {
		for(const item of this.items) {
			item.update();
		}
	}
	render(g) {
		for(const item of this.items) {
			item.render(g);
		}
	}
	causeEvent(type, events) {
		for(const item of this.items) {
			item.causeEvent(type, events);
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