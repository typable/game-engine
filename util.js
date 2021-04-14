const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

export function scaleCanvas(canvas, width, height) {
	const g = canvas.getContext('2d');
	const backingStoreRatio = g.webkitBackingStorePixelRatio || 1;
	const ratio = DEVICE_PIXEL_RATIO / backingStoreRatio;
	if(DEVICE_PIXEL_RATIO != backingStoreRatio) {
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	}
	else {
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = '';
		canvas.style.height = '';
	}
	g.scale(ratio, ratio);
}
