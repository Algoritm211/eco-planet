import {WalletConnection} from "near-api-js";
import { providers } from 'near-api-js';

export class EcoNEAR {
  contractId = 'dev-1667042563649-66373372156087';
  wallet: WalletConnection;

  constructor({ walletToUse }: {walletToUse: WalletConnection}) {
    this.wallet = walletToUse;
  }

  async getUser() {
    const provider = new providers.JsonRpcProvider({ url: 'https://rpc.testnet.near.org' });
    const res = await provider.query({
      request_type: 'call_function',
      account_id: this.contractId,
      method_name: 'getUser',
      args_base64: Buffer.from(JSON.stringify({id: 'dev-1667042563649-66373372156087'})).toString('base64'),
      finality: 'optimistic',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(Buffer.from(res.result).toString());
  }
}
