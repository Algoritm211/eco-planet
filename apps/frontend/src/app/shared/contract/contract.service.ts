import {Injectable} from "@angular/core";
import {from} from "rxjs";
import {EcoNEAR} from "./near-interface";


@Injectable({
  providedIn: 'root',
})
export class ContractService {

  public ecoNear: EcoNEAR;

  constructor() {}

  loadUser() {
    return from(this.ecoNear.getUser());
  }

  addUser(name: string) {
    return from(this.ecoNear.addUser(name));
  }
}
