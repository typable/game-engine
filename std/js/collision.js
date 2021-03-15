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