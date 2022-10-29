import {WalletConnection} from "near-api-js";
import { providers } from 'near-api-js';

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

export class EcoNEAR {
  contractId = 'dev-1667070353306-71041769858786';
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
      args_base64: Buffer.from(JSON.stringify({id: this.wallet.getAccountId()})).toString('base64'),
      finality: 'optimistic',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(Buffer.from(res.result).toString());
  }

  async addUser(name: string) {
    // Sign a transaction with the "FunctionCall" action

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await this.wallet.account().functionCall({
      contractId: this.contractId,
      methodName: 'addUser',
      args: {name},
      gas: THIRTY_TGAS,
    })
    console.log(result);

    return result;
    // const outcome = await this.wallet.signAndSendTransaction({
    //   signerId: this.wallet.getAccountId(),
    //   receiverId: this.contractId,
    //   actions: [
    //     {
    //       type: 'FunctionCall',
    //       params: {
    //         methodName: 'addUser',
    //         args: {name},
    //         gas: THIRTY_TGAS,
    //         deposit: NO_DEPOSIT,
    //       },
    //     },
    //   ],
    // });
    //
    // return providers.getTransactionLastResult(outcome)
  }
}
