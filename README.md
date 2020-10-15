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
     .catch(err =>  console.erro(err));

// pop
queue.pop('list-name')
    .then(result => console.log(result))
    .catch(err => console.error(err));
```
