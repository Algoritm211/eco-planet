import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';
import { User } from '../../contract/src/contract'

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = {root, contract};
});

test.afterEach(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('Add user', async (t) => {
  const mockUser = { name: 'Alex' };
  const {root, contract} = t.context.accounts;
  const user = await root.call<User>(contract, 'addUser', mockUser);
  t.deepEqual(
    user,
    { accountId: 'test-account.test.near', name: 'Alex', award: 0, socialRating: 0 }
  );
})

test('Get user', async (t) => {
  const mockUser = { name: 'Max' };
  const {root, contract} = t.context.accounts;
  await root.call<User>(contract, 'addUser', mockUser);
  const user = await contract.view('getUser', {id: contract.accountId});
  t.deepEqual(
    user,
    { accountId: 'test-account.test.near', name: 'Max', award: 0, socialRating: 0 }
  )
})

test('Get users', async (t) => {
  const { root, contract } = t.context.accounts;

  const mockUser = { name: 'Alex' };

  await root.call<User>(contract, 'addUser', mockUser);

  const allUsers = await contract.view<User[]>('getUsers');
  t.is(allUsers.length, 1)
  t.is(allUsers[0].name, 'Alex')
})

test('User contributes to environment', async (t) => {
  const { root, contract } = t.context.accounts;
  const mockUser = { name: 'Alex' };
  await root.call<User>(contract, 'addUser', mockUser);

  await root.call<User>(contract, 'newIncomeDataFromUser', {amount: 25});
  const newUser = await root.call<User>(contract, 'newIncomeDataFromUser', {amount: 25});
  t.is(newUser.socialRating, 1.4)
  t.is(newUser.award, 17.5)
});
