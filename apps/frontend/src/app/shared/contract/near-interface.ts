import {WalletConnection} from "near-api-js";
import { providers } from 'near-api-js';
import {CONTRACT_ID} from "../constants";
import {ContributionDTO} from "@maorix-contract/types";

const THIRTY_TGAS = '30000000000000';

export class EcoNEAR {
  contractId = CONTRACT_ID;
  wallet: WalletConnection;

  constructor({ walletToUse }: {walletToUse: WalletConnection}) {
    this.wallet = walletToUse;
  }

  async loadUser() {
    return this.callViewFunction('getUser', {id: this.wallet.getAccountId()})
  }

  async getAllUsers() {
    return this.callViewFunction('getUsers');
  }

  async addUser(name: string) {
    return this.callChangeFunction('addUser', {name})
  }

  async makeContribution(data: ContributionDTO) {
    return this.callChangeFunction('newIncomeDataFromUser', {...data})
  }


  // For functions which are changing state
  private async callChangeFunction(method: string, params: Record<string, unknown> = {}) {
    const result = await this.wallet.account().functionCall(
      {
      contractId: this.contractId,
      methodName: method,
      args: params,
      gas: THIRTY_TGAS,
    })

    return result;
  }

  private async callViewFunction(method: string, params: Record<string, unknown> = {}) {
    const provider = new providers.JsonRpcProvider({ url: 'https://rpc.testnet.near.org' });
    const res = await provider.query({
      request_type: 'call_function',
      account_id: this.contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(params)).toString('base64'),
      finality: 'optimistic',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(Buffer.from(res.result).toString());
  }
}
