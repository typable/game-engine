export class Group {
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
	collide() {
		for(const i of this.items) {
			i.items = [];
			i.collided = false;
		}
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
						if(!a.collided) {
							a.collided = collided;
						}
						if(!b.collided) {
							b.collided = collided;
						}
						if(collided) {
							if(!a.items.includes(b)) {
								a.items.push(b);
							}
							if(!b.items.includes(a)) {
								b.items.push(a);
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
