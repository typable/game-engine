export function html(strings, ...props) {
	let code = '';
	let events = [];
	let children = [];
	for(let i = 0; i < strings.length; i++) {
		code += strings[i];
		if(i < props.length) {
			if(typeof props[i] === 'function') {
				const exp = new RegExp(/on(\w+)=/, 'g');
				const match = exp.exec(strings[i]);
				if(match) {
					const [, type] = match;
					code = code.slice(0, -(type.length + 3));
					code += `data-event-ref="${events.length}"`;
					events.push({ type, handler: props[i] });
				}
				continue;
			}
			if(props[i] instanceof Array) {
				for(const item of props[i]) {
					if(item instanceof HTMLElement) {
						code += `<div data-child-ref="${children.length}"></div>`;
						children.push(item);
						continue;
					}
					code += item;
				}
				continue;
			}
			if(props[i] instanceof HTMLElement) {
				code += `<div data-child-ref="${children.length}"></div>`;
				children.push(props[i]);
				continue;
			}
			code += props[i];
		}
	}
	const template = document.createElement('template');
	template.innerHTML = code;
	const fragment = template.content.cloneNode(true);
	const element = fragment.firstElementChild;
	for(const [id, {type, handler}] of Object.entries(events)) {
		let target;
		if(element.getAttribute('data-event-ref') === id) {
			target = element;
		}
		else {
			target = element.querySelector(`[data-event-ref="${id}"]`);
		}
		target.addEventListener(type, handler);
		target.removeAttribute('data-event-ref');
	}
	for(const [id, child] of Object.entries(children)) {
		element.querySelector(`[data-child-ref="${id}"]`).replaceWith(child);
	}
	return element;
}

export function escape(string) {
	return string.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}