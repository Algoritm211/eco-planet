import {NearBindgen, near, call, view, UnorderedMap, Vector} from 'near-sdk-js';
import {ContributionDTO, User} from "../../../../libs/types/src";

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
    const userWallet = near.signerAccountId();
    near.log(`Adding user with accountId=${userWallet}`)
    if (this.users.get(userWallet)) {
      near.log(`User with accountId=${userWallet} already exists`)
      return;
    }

    const user = new UnorderedMap(`user-${userWallet}`);
    user.set('accountId', userWallet);
    user.set('name', name || Date.now().toString());
    user.set('contribution', 0);
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
    const rawUsers = UnorderedMap.deserialize(this.users).toArray();
    const users = rawUsers.map(([, userData]: [string, UnorderedMap]) => {
      return this.convertToObject<User>(userData)
    }).sort((a, b) => a.contribution - b.contribution)

    const userIndex = users.findIndex(user => user.accountId === id)

    const resultUser = users[userIndex];
    if (!resultUser) {
      return;
    }
    const user = {
      ...resultUser,
      rank: userIndex + 1,
    }

    return user;
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
    const userWallet = near.signerAccountId();

    const user = UnorderedMap.deserialize(this.users.get(userWallet) as UnorderedMap);

    user.set('contribution', Number(user.get('contribution')) + amount);

    user.set('socialRating', Number(user.get('socialRating')) + 0.5)

    user.set(
      'award',
      Number(user.get('award')) + amount * Number(user.get('socialRating'))
    );

    this.users.set(userWallet, user);
    near.log(`User with hash ${userWallet} was updated`);
    return this.convertToObject(user)
  }
}
