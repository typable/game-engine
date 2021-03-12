import { Overview, Category, Message } from './component.js';

window.onload = async function() {
	const main = document.querySelector('main .container');
	try {
		const data = await fetchPostData();
		if(!data || data.length === 0) {
			throw new Error('Response body is empty: 500');
		}
		main.append(Overview(data));
		for(const category of data) {
			main.append(Category(category));
		}
	}
	catch(error) {
		console.error(error);
		main.append(Message({
			message: 'Something went wrong!',
			description: error.message
		}));
	}
};

async function fetchPostData() {
	const response = await fetch('/data/post.json');
	if(response.status !== 200) {
		throw new Error('Invalid status code: ' + response.status);
	}
	return await response.json();
}