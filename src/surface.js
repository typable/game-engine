import Shape from './shape.js';

export default class Surface {
	constructor(x, y, shape) {
		this.x = x;
		this.y = y;
		this.shape = shape;
	}
	update() {
		// nothing
	}
	render(g) {
		if(this.shape instanceof Shape.Rect) {
			g.beginPath();
			g.rect(this.x, this.y, this.shape.width, this.shape.height);
			g.stroke();
		}
		if(this.shape instanceof Shape.Circle) {
			g.beginPath();
			g.arc(this.x, this.y, this.shape.radius, 2 * Math.PI, 0);
			g.stroke();
		}
	}
	causeEvent(type, events) {
		if(this['on' + type]) {
			for(const event of events) {
				if(event.type === type) {
					this['on' + type](event);
				}
			}
		}
	}
}
