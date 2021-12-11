export interface Plugins {
	last_update_check: number
	loaded_keys: PluginDefinition[];
}

export interface PluginDefinition {
	name: string;
	description_short: string;
	readme_list: string;
	git_repo: string;
	status: PluginStatus
}

export enum PluginStatus {
	DISABLED = 0,
	ACTIVE = 1,
	TIMED = 2,
	OUTDATED = 3
}
