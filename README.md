# rsrq
Really simple redis queue

An extremely simple implementation of the queue data structure
using redis as a backend.

### Installation
```shell
npm install rsrq --save
```
or
```shell
yarn add rsrq
```

### Initialization
```ts
import { createClient, RedisClient } from 'redis';
import { RedisQueue } from 'rsrq';

const client: RedisClient = createClient;
const queue = new RedisQueue(client);
```

### Usage
```ts
// push
queue.push('list-name', JSON.stringify({
  foo: 'bar',
})).then(result => console.log(result))
   .catch(err => console.error(err));

// peek
queue.peek('list-name')
     .then(result => console.log(result))
     .catch(err =>  console.error(err));

// pop
queue.pop('list-name')
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

### Run tests
Clone the repository
```shell
git clone https://github.com/dusnm/rsrq.git && cd rsrq
```
Install dependencies
```shell
npm install
```
Run the tests with npm
```shell
npm run test
```

All tests should pass
```
Promisifier test
    testPromisifyMethodByReflection
      ✓ should promisify a callback based method by reflection
      ✓ should return null when a method does not exist on the target

  RedisQueue test
    testPeek
      ✓ should return the value of the first key on successive calls
    testPush
      ✓ should append an item to the end of the list
    testPop
      ✓ should delete the value of the first key and return it
```