import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HashRatePipe} from './crypto/hashrate.pipe';
import {TimeAgoPipe} from './date/timeAgo.pipe';
import {EscapeHtmlPipe} from './content/html.pipe';
import {ShruggiePipe} from './content/shruggie.pipe';
import {RemoveTrailingZerosPipe} from './math/removeTrailingZeros.pipe';
import {MarkdownPipe} from './content/markdown.pipe';
import {EffortPipe} from './crypto/effort.pipe';
import {ToCoinPipe} from 'app/pipes/crypto/toCoin.pipe';
import {HashLinkPipe} from 'app/pipes/crypto/hashLink.pipe';

@NgModule({
	declarations: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		MarkdownPipe,
		ToCoinPipe,
		HashLinkPipe
	],
	exports: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		MarkdownPipe,
		ToCoinPipe,
		HashLinkPipe
	],
	imports: [CommonModule]
})
export class PipesModule {
}
