import {createAction, props} from '@ngrx/store';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {Transactions} from '@plugin/lthn/chain/interfaces/props/transactions';


export const ChainLoadData = createAction('[Chain] Load Requested' );
export const ChainLoaded = createAction('[Chain] Loaded' );
export const ChainSetGetInfo = createAction('[Chain] Set Get Info', props<{ info: ChainGetInfo }>() );
export const ChainSetTransactions = createAction('[Chain] Set Transactions', props<{ transactions: Transactions }>() );
export const ChainSetBlocks = createAction('[Chain] Set Blocks', props<{ blocks: any }>() );

