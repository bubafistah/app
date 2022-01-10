import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffortPipe, EscapeHtmlPipe, HashLinkPipe, HashRatePipe, MarkdownPipe, RemoveTrailingZerosPipe, ShruggiePipe, TimeAgoPipe, ToCoinPipe} from '@pipe/index';

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
