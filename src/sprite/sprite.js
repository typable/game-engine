const cache = new Map();

export default class Sprite {
	constructor(path) {
		this.path = path;
		this.image = new Image();
	}
	load() {
		return new Promise(async (resolve, reject) => {
			this.image.onload = () => {
				if(!cache.has(this.path)) {
					cache.set(this.path, this.image.src);
				}
				resolve();
			};
			this.image.onerror = () => {
				reject(new Error(`Unable to load sprite '${this.path}'!`));
			}
			if(cache.has(this.path)) {
				this.image.src = cache.get(this.path);
			}
			else {
				if(this.path.startsWith('data:')) {
					this.image.src = this.path;
				}
				else {
					try {
						const response = await fetch(this.path);
						if(response.status !== 200) {
							reject(new Error(`Invalid response code ${response.status} for sprite '${this.path}'!`));
						}
						const blob = await response.blob();
						const url = URL.createObjectURL(blob);
						this.image.src = url;
					}
					catch(error) {
						reject(error);
					}
				}
			}
		});
	}
}
