import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';

export interface ChainState {
	info: ChainGetInfo
}

export class ChainState implements ChainState {}
