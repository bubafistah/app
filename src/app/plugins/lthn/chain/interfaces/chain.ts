import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {Transactions} from '@plugin/lthn/chain/interfaces/props/transactions';
import {BlockHeader} from '@plugin/lthn/chain/interfaces/types/blockHeader';

export interface ChainState {
	info: ChainGetInfo
	transactions: Transactions
	blocks: {
		headers: BlockHeader[]
	}
}

export class ChainState implements ChainState {}
