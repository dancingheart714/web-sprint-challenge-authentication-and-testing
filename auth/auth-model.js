const db = require('../data/dbConfig');

function find() {
  return db('users');
}

function findByUsername(username) {
  return db('users').where({ username }).first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first;
}

module.exports = {
  find,
  findByUsername,
  add,
  findById,
};
