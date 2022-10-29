import {Action, Selector, State, StateContext} from "@ngxs/store";
import {User} from "@maorix-contract/types";
import {LoadProfileFailed, LoadProfileSuccess, LoadUserProfile} from "./user.actions";
import {ContractService} from "../../contract/contract.service";
import {catchError, tap} from "rxjs";
import {Injectable} from "@angular/core";

interface UserStateModel {
  user: User | null;
  status?: 'loading' | 'error' | 'confirmed'
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

  @Action(LoadUserProfile, {cancelUncompleted: true})
  loadUserProfile({dispatch, patchState}: StateContext<UserStateModel>) {
    patchState({status: 'loading'});

    return this.contractService.loadUser().pipe(
      tap(user => user ? dispatch(LoadProfileSuccess) : ''
      ),
      catchError((err) => {
        console.error(err)
        return dispatch(LoadProfileFailed)
      }),
      tap(user => {
        console.log('UUUUUUUUUSEEEE', user)
        if (user) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          patchState({user: user})
        }
      })
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

