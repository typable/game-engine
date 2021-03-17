import { Shape } from './game.js';

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
	const dx = Math.abs(circle.x - rect.x);
	const dy = Math.abs(circle.y - rect.y);
	if(dx > rect.shape.width / 2 + circle.radius) {
		return false;
	}
	if(dy > rect.shape.height / 2 + circle.radius) {
		return false;
	}
	if(dx < rect.shape.width / 2) {
		return true;
	}
	if(dy < rect.shape.height / 2) {
		return true;
	}
	return (dx - rect.shape.width / 2) ** 2 + (dy - rect.shape.height / 2) ** 2 < circle.radius ** 2;
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
