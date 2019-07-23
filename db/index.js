import RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-leveldb'));
const leveldown = require('leveldown');

const database = await RxDB.create({
  name: 'test',
  adapter: leveldown
});

console.dir(database);
