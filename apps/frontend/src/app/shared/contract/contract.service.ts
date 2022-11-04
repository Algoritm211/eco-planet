import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {EcoNEAR} from "./near-interface";
import {ContributionDTO, User} from "@maorix-contract/types";


@Injectable({
  providedIn: 'root',
})
export class ContractService {

  public ecoNear: EcoNEAR;

  constructor() {}

  loadUser() {
    return from(this.ecoNear.loadUser());
  }

  getAllUsers(): Observable<User[]> {
    return from(this.ecoNear.getAllUsers())
  }

  addUser(name: string) {
    return from(this.ecoNear.addUser(name));
  }

  makeContribution(data: ContributionDTO) {
    return from(this.ecoNear.makeContribution(data))
  }
}
