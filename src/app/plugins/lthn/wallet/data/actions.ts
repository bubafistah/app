import {createAction, props} from '@ngrx/store';
import {Balance, GetTransfersOut} from '@plugin/lthn/wallet/interfaces';

export const addWallet = createAction(
	'[Wallet] Adding Known Wallet',
	props<{ address: string }>()
);

export const switchWallet = createAction(
	'[Wallet] Switching Wallets',
	props<{ address: string }>()
);

export const getWalletList = createAction(
	'[Wallet] Get Wallet list'
)

export const updateWalletData = createAction(
	'[Wallet] Wallet Data Update',
	props<{ address: string, payload: any }>()
)

export const getWalletData = createAction(
	'[Wallet] Get Wallet Data',
	props<{ address: string }>()
	)


export const openWallet = createAction(
	'[Wallet] Open Wallet',
	props<{ address: string, password: string }>()
)

// Adding and failing to add wallets
export const WalletAdd = createAction('[Wallet] Add Address', props<{ address: string}>() );
export const WalletAddValid = createAction('[Wallet] Valid Address ', props<{ address: any}>() );
export const WalletAddInvalid = createAction('[Wallet] Invalid Address', props<{ error: any }>() );
export const WalletDelete = createAction('[Wallet] Delete Address', props<{ address: any }>() );
export const WalletFailure = createAction('[Wallet] General Fail', props<{ error: string }>() );
// loading states
export const WalletStartPolling = createAction('[Wallet] Start Polling');
export const WalletStopPolling = createAction('[Wallet] Stop Polling');
export const WalletStoppedPolling = createAction('[Wallet] Stopped Polling');
export const WalletLoadData = createAction('[Wallet] Load Requested' );
export const WalletLoaded = createAction('[Wallet] Loaded' );
export const WalletTransfers = createAction('[Wallet] Loaded Transfers', props<{ address: string, transfers: GetTransfersOut[] }>() );
export const WalletBalance = createAction('[Wallet] Loaded Balance', props<{ address: string, balance: Balance }>() );

