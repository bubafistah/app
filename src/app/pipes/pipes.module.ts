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

@NgModule({
	declarations: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		MarkdownPipe,
		ToCoinPipe
	],
	exports: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		MarkdownPipe,
		ToCoinPipe
	],
	imports: [CommonModule]
})
export class PipesModule {
}
