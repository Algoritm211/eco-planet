import {Injectable} from "@angular/core";
import {NearAuthService} from "../../auth/core/services/near-auth.service";
import {switchMap} from "rxjs";
import {EcoNEAR} from "./near-interface";


@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(private nearAuth: NearAuthService) {}

  loadUser() {
    return this.nearAuth.wallet$.pipe(
      switchMap(async (wallet) => {
        const ecoNear = new EcoNEAR({walletToUse: wallet});
        return ecoNear.getUser();
      })
    )
  }

  addUser(name: string) {
    return this.nearAuth.wallet$.pipe(
      switchMap(async (wallet) => {
        const ecoNear = new EcoNEAR({walletToUse: wallet});
        return ecoNear.addUser(name);
      })
    )
  }
}
