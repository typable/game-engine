window.onload = function() {
	append_clipboard_button();
};

function append_clipboard_button() {
	for(const code of document.querySelectorAll('code')) {
		const clipboard = document.createElement('div');
		clipboard.classList.add('clipboard');
		clipboard.classList.add('ico');
		clipboard.textContent = 'link';
		clipboard.title = 'Copy';
		code.append(clipboard);

		clipboard.onclick = function() {
			navigator.clipboard.writeText(code.querySelector('pre').textContent);
		}
	}
}
