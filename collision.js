import { Shape } from './shape.js';

export function collideRect(a, b) {
	return a.x < b.x + b.shape.width && a.x + a.shape.width > b.x
		&& a.y < b.y + b.shape.height && a.y + a.shape.height > b.y;
}

export function collideCircle(a, b) {
	const dx = Math.abs(a.x - b.x);
	const dy = Math.abs(a.y - b.y);
	return Math.sqrt(dx ** 2 + dy ** 2) < a.shape.radius + b.shape.radius;
}

export function collideRectAndCircle(a, b) {
	const [rect, circle] = a instanceof Shape.Rect ? [a, b] : [b, a];
	let x = circle.x;
	let y = circle.y;
	if(circle.x < rect.x) {
		x = rect.x;
	}
	else if(circle.x > rect.x + rect.shape.width) {
		x = rect.x + rect.shape.width;
	}
	if(circle.y < rect.y) {
		y = rect.y;
	}
	else if(circle.y > rect.y + rect.shape.height) {
		y = rect.y + rect.shape.height;
	}
	const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
	return distance <= circle.shape.radius;
}

export function collidePoint(object, point) {
	if(object.shape instanceof Shape.Rect) {
		const {x, y, shape: {width, height}} = object;
		return x < point.x && x + width > point.x && y < point.y && y + height > point.y;
	}
	if(object.shape instanceof Shape.Circle) {
		const {x, y, shape: {radius}} = object;
		return Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2) < radius;
	}
}
