export interface ChartConfigInterface {
	key: string;
	type: string;
	data: object;
	options: object;

	setupCallbacks(): void;

	dataMap(data: any, i: number): any;
}
