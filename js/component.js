import { html, escape } from './util.js';

export const Overview = props => {
	return html`<div>
		<h3>Overview</h3>
		<ul class="overview">
			${props.map(category => {
				return html`<li>
					<p>${category.name}</p>
					<ul>
						${category.posts.map(post => {
							const goto = () => {
								const target = document.querySelector(`[data-id="${post.id}"]`);
								if(target) {
									window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
								}
							};
							return html`<li>
								<a onclick=${goto}>${post.name}</a>
							</li>`;
						})}
					</ul>
				</li>`;
			})}
		</ul>
	</div>`;
};

export const Category = props => {
	return html`<div>
		<h2>${props.name}</h2>
		${props.posts.map(Post)}
	</div>`;
};

export const Post = props => {
	const url = 'https://git.typable.dev/std' + props.url;
	return html`<article data-id="${props.id}">
		<label>${props.name}</label>
		${props.syntax ? `<pre>${escape(props.syntax)}</pre>` : ''}
		<p>${props.description}</p>
		<code>
			<pre>${escape(url)}</pre>
			${CopyButton({ value: url })}
		</code>
		${props.code ? (
			html`<code>
				<pre>${escape(props.code.join('\n'))}</pre>
				${CopyButton({ value: props.code.join('\n') })}
			</code>`
		) : ''}
	</article>`;
};

export const CopyButton = props => {
	const copy = () => navigator.clipboard.writeText(props.value);
	return html`<div class="clipboard ico" title="Copy" onclick=${copy}>link</div>`;
};

export const Message = props => {
	return html`<div class="message">
		<h3>${props.message}</h3>
		${props.description ? `<p>${props.description}</p>` : ''}
	</div>`;
}