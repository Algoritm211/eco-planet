import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {EcoNEAR} from "./near-interface";
import {User} from "@maorix-contract/types";


@Injectable({
  providedIn: 'root',
})
export class ContractService {

  public ecoNear: EcoNEAR;

  constructor() {}

  loadUser() {
    return from(this.ecoNear.getUser());
  }

  getAllUsers(): Observable<User[]> {
    return from(this.ecoNear.getAllUsers())
  }

  addUser(name: string) {
    return from(this.ecoNear.addUser(name));
  }
}
