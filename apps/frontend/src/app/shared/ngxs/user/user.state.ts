import {Action, Selector, State, StateContext} from "@ngxs/store";
import {User} from "@maorix-contract/types";
import {LoadProfileFailed, LoadProfileSuccess, LoadUserProfile} from "./user.actions";
import {ContractService} from "../../contract/contract.service";
import {catchError, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {DataStatus} from "../../types";

interface UserStateModel {
  user: User | null;
  status?: DataStatus
}


@State<UserStateModel>({
  name: 'User',
  defaults: {
    user: null,
  }
})
@Injectable()
export class UserState {

  constructor(private contractService: ContractService) {
  }

  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }

  @Selector()
  static getStatus(state: UserStateModel) {
    return state.status;
  }

  @Action(LoadUserProfile, {cancelUncompleted: true})
  loadUserProfile({dispatch, patchState}: StateContext<UserStateModel>) {
    patchState({status: 'loading'});

    return this.contractService.loadUser().pipe(
      tap(user => user ? () => {
          dispatch(LoadProfileSuccess)
          patchState({user: user})
        } : ''
      ),
      catchError((err) => {
        console.error(err)
        return dispatch(LoadProfileFailed)
      }),
    )
  }

  @Action(LoadProfileSuccess)
  orderSuccess({patchState}: StateContext<UserStateModel>) {
    patchState({status: 'confirmed'});
  }

  @Action(LoadProfileFailed)
  orderFailed({patchState}: StateContext<UserStateModel>) {
    patchState({status: 'error'});
  }
}

