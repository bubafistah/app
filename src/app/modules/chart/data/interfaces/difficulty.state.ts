export interface ChartDifficultyState {
	options: {
		pollingInterval: number;
	};
	data: ChartDifficulty[];
}

export class ChartDifficultyState implements ChartDifficultyState {
	data: ChartDifficulty[] = [];
	options: { pollingInterval: number } = { pollingInterval: 30000 };
}

export interface ChartDifficulty {
	ts: string;
	diff: string;
}
