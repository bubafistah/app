import { createAction, props } from '@ngrx/store';
import {Balance, GetTransfersOut, Transfer} from '@plugin/lthn/wallet/interfaces';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';



export const ChainLoadData = createAction('[Chain] Load Requested' );
export const ChainLoaded = createAction('[Chain] Loaded' );
export const ChainSetGetInfo = createAction('[Chain] Set Get Info', props<{ info: ChainGetInfo }>() );

