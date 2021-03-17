import { html } from '../std/js/render.js';
import { Overview, Category, Message } from './component.js';

export const App = async props => {
	let body;
	try {
		const data = await fetchPostData();
		if(!data || data.length === 0) {
			throw new Error('Response body is empty: 500');
		}
		body = html`<div>
			${Overview(data)}
			${data.map(Category)}
		</div>`;
	}
	catch(error) {
		console.error(error);
		body = Message({
			message: 'Something went wrong!',
			description: error.message
		});
	}
	return html`<div>
		<header class="container-fluid">
			<div class="row">
				<div class="container">
					<h1>git.typable</h1>
					<p>A place for commonly used code snippets.</p>
				</div>
			</div>
		</header>
		<main class="container-fluid">
			<div class="row">
				<div class="container">${body}</div>
			</div>
		</main>
		<footer class="container-fluid">
			<div class="row">
				<div class="container">
					<span>&copy; typable ${new Date().getFullYear()}</span>
					<a href="https://www.buymeacoffee.com/typable">Donate</a>
					<a href="https://typable.dev/imprint">Imprint</a>
					<a href="https://typable.dev/terms">Terms</a>
				</div>
			</div>
		</footer>
	</div>`;
};

async function fetchPostData() {
	const response = await fetch('/data/post.json');
	if(response.status !== 200) {
		throw new Error('Invalid status code: ' + response.status);
	}
	return await response.json();
}