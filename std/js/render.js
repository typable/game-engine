export function html(strings, ...props) {
	try {
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
						code += `data-event-ref-${events.length}`;
						events.push({ type, handler: props[i] });
					}
					continue;
				}
				if(props[i] instanceof Array) {
					for(const item of props[i]) {
						if(item instanceof HTMLElement) {
							const tag = item.tagName.toLowerCase();
							code += `<${tag} data-child-ref-${children.length}></${tag}>`;
							children.push(item);
							continue;
						}
						code += item;
					}
					continue;
				}
				if(props[i] instanceof HTMLElement) {
					const tag = props[i].tagName.toLowerCase();
					code += `<${tag} data-child-ref-${children.length}></${tag}>`;
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
			if(element.hasAttribute(`data-event-ref-${id}`)) {
				target = element;
			}
			else {
				target = element.querySelector(`[data-event-ref-${id}]`);
			}
			if(target) {
				target.addEventListener(type, handler);
				target.removeAttribute(`data-event-ref-${id}`);
			}
			else {
				console.warn(`Unable to bind ${type} event to element with id: ${id}`);
			}
		}
		for(const [id, child] of Object.entries(children)) {
			const target = element.querySelector(`[data-child-ref-${id}]`);
			if(target) {
				target.replaceWith(child);
			}
			else {
				console.warn(`Unable to reference <${child.tagName.toLowerCase()}> tag with id: ${id}`);
			}
		}
		return element;
	}
	catch(error) {
		console.error(error);
	}
}

export function escape(string) {
	return string.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}