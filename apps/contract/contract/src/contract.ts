import {NearBindgen, near, call, view, LookupMap, UnorderedMap, Vector} from 'near-sdk-js';

export interface User {
  // Unique id or wallet
  accountId: string
  // Number of tokens for award in the end of month
  award: number
  // Name
  name: string
  // HERE QUESTIONG WHAT IT IS
  socialRating: number
}

@NearBindgen({})
class EcoContract {
  users: UnorderedMap;

  constructor() {
    this.users = new UnorderedMap('users');
  }

  private convertToObject<T>(map: UnorderedMap): T {
    const result = {} as T;
    for (const [key, value] of UnorderedMap.deserialize(map).toArray()) {
      result[key] = value;
    }
    return result
  }

  @call({})
  addUser({name}: User){
    const userWallet = near.currentAccountId();
    near.log(`Adding user with accountId=${userWallet}`)

    const user = new UnorderedMap(`user-${userWallet}`);
    user.set('accountId', userWallet);
    user.set('name', name || Date.now().toString());
    user.set('award', 0);
    user.set('socialRating', 0);

    this.users.set(userWallet, user);
    near.log(`User with hash ${userWallet} and ${name} was added`);
    return this.convertToObject<User>(user);
  }

  @view({})
  getUser({id}: {id: string}) {
    near.log(`User with accountId=${id}`);
    const user = UnorderedMap.deserialize(
      (this.users.get(id)) as UnorderedMap
    ) as UnorderedMap;
    return this.convertToObject(user);
  }
}
