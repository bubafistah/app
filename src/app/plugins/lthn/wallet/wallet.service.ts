import { Injectable } from '@angular/core';
import {WalletRpcService} from '@service/wallet.rpc.service';
import {RestoreWallet} from '@plugin/lthn/wallet/interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private rpc: WalletRpcService) { }

  /**
   * Start wallet service
   *
   * @returns {Promise<void>}
   */
  startWallet(){
    return this.rpc.startWallet()
  }

  /**
   * Restore wallet
   *
   * {filename: '', address: '', restore_height: '', autosave_current: true,
   * password: '', spendkey (optional),viewkey: ''}
   *
   * @param {RestoreWallet} req
   * @returns {Promise<AxiosResponse<any>>}
   */
  restoreWallet(req: RestoreWallet){
    return this.rpc.restoreWallet(req)
  }
}
