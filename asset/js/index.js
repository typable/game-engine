window.onload = async function() {
	for(const rel of document.querySelectorAll('[data-rel]')) {
		rel.onclick = function() {
			const {rel: code} = rel.dataset;
			if(code === 'top') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
			else {
				const ref = document.querySelector(`[data-ref="${code}"]`);
				if(ref) {
					window.scrollTo({ top: ref.offsetTop - 80, behavior: 'smooth' });
				}
			}
		}
	}
	for(const ref of document.querySelectorAll('span.ref')) {
		ref.onclick = function() {
			if(ref.classList.contains('ref-link')) {
				window.open(ref.textContent, '_blank');
			}
		}
	}
};