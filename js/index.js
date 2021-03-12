import { App } from './app.js';

window.onload = async function() {
	document.querySelector('#root').append(await App());
};