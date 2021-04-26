class Rect {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
}

class Circle {
	constructor(radius) {
		this.radius = radius;
	}
}

const Shape = { Rect, Circle };

export default Shape;
