import {Action, Selector, State, StateContext} from "@ngxs/store";
import {User} from "@maorix-contract/types";
import {AddNewUser, LoadProfileFailed, LoadProfileSuccess, LoadUserProfile} from "./user.actions";
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

  @Action(AddNewUser, {cancelUncompleted: true})
  addNewUser({dispatch, patchState}: StateContext<UserStateModel>, {name}: AddNewUser) {
    patchState({status: 'loading'});

    // Changing methods now return an error because absence of process.env in near-api-js
    return this.contractService.addUser(name).pipe(
      tap(() => {
          dispatch(LoadProfileSuccess)
        }
      ),
      catchError(() => {
        dispatch(new LoadUserProfile())
        return dispatch(LoadProfileFailed)
      }),
    )
  }

  @Action(LoadUserProfile, {cancelUncompleted: true})
  loadUserProfile({dispatch, patchState}: StateContext<UserStateModel>) {
    patchState({status: 'loading'});

    return this.contractService.loadUser().pipe(
      tap((user) => {
          dispatch(LoadProfileSuccess)
          patchState({user: user})
        }
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

