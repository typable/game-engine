export function html(func) {
	return {
		build: function(args) {
			let template = document.createElement('template');
			template.innerHTML = func(args);
			let fragment = template.content.cloneNode(true);
			return {
				element: fragment.firstElementChild,
				render: function(parent) {
					parent.appendChild(fragment);
				}
			};
		}
	};
}
