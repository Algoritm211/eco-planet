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

export interface ContributionDTO {
  amount: number;
}

@NearBindgen({})
class EcoContract {
  users: UnorderedMap;
  userAccounts: Vector;

  constructor() {
    this.users = new UnorderedMap('users');
    this.userAccounts = new Vector('userAccounts')
  }

  private convertToObject<T>(map: UnorderedMap): T {
    const result = {} as T;
    for (const [key, value] of UnorderedMap.deserialize(map).toArray()) {
      result[key] = value;
    }
    return result
  }

  @call({})
  addUser({name}: User) {
    const userWallet = near.currentAccountId();
    near.log(`Adding user with accountId=${userWallet}`)
    if (this.users.get(userWallet)) {
      near.log(`User with accountId=${userWallet} already exists`)
      return;
    }

    const user = new UnorderedMap(`user-${userWallet}`);
    user.set('accountId', userWallet);
    user.set('name', name || Date.now().toString());
    user.set('award', 0);
    user.set('socialRating', 0);

    this.users.set(userWallet, user);
    this.userAccounts.push(userWallet);
    near.log(`User with hash ${userWallet} and ${name} was added`);
    return this.convertToObject<User>(user);
  }

  @view({})
  getUser({id}: { id: string }) {
    near.log(`User with accountId=${id}`);
    const user = UnorderedMap.deserialize(
      (this.users.get(id)) as UnorderedMap
    ) as UnorderedMap;
    return this.convertToObject(user);
  }

  @view({})
  getUsers({}) {
    near.log('Getting all users');
    const values = UnorderedMap.deserialize(this.users).toArray();

    const result = values.map(([, userData]: [string, UnorderedMap]) => {
      return this.convertToObject(userData)
    })

    return result;
  }

  @call({})
  newIncomeDataFromUser({amount}: ContributionDTO) {
    const userWallet = near.currentAccountId();

    const user = UnorderedMap.deserialize(this.users.get(userWallet) as UnorderedMap);
    user.set(
      'award',
      Number(user.get('award')) + amount * Number(user.get('socialRating'))
    );
    user.set('socialRating', Number(user.get('socialRating')) + 0.7)
    this.users.set(userWallet, user);
    near.log(`User with hash ${userWallet} was updated`);
    return this.convertToObject(user)
  }
}
