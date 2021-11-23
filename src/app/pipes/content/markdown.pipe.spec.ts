import {MarkdownPipe} from './markdown.pipe.ts';

describe('MarkdownPipe', () => {
	it('create an instance', () => {
		const pipe = new MarkdownPipe();
		expect(pipe).toBeTruthy();
	});
});
