import knex from 'knex';
// const readline = require('readline');

const dbConnectionConfig = require('../DB_connection_config.json');
const usersMocks = require('./dataSet/mockUsers.json');

const createUserTable = () => {
  knexDB.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('login', 100);
    table.string('password', 50);
    table.integer('age', 3);
  });
  console.log('table "users" is created');
}

const fulFillUserTable = () => {
  // console.log('usersMocks', usersMocks)
  knexDB('users').insert(usersMocks);
  
  console.log('table "users" is fulfilled');

  // knexDB.transaction(function(trx) {
  //   knexDB('users').transacting(trx).insert(usersMocks)
  //     .then(trx.commit)
  //     .catch(trx.rollback);
  // })
  // .then(function(resp) {
  //   console.log('Transaction complete.');
  // })
  // .catch(function(err) {
  //   console.error(err);
  // });

  // knexDB.batchInsert('users', usersMocks)
  //   .then(function(ids) { 
  //     console.log('table "users" is fulfilled', ids);
  //    })
  //   .catch(function(error) { 
  //     console.log('Something went wrong...');
  //     console.log(error);
  //    });

  // knexDB.transaction(function(tr) {
  //   return knexDB.batchInsert('users', usersMocks)
  //     .transacting(tr)
  //   })
  //   .then(function() { 
  //     console.log('table "users" is fulfilled');
  //    })
  //   .catch(function(error) { 
  //     console.log('Something went wrong...');
  //     console.log(error);
  //   });
}

const knexDB = knex(dbConnectionConfig);

knexDB.schema.hasTable('users').then(function(exists) {
  if (exists) {
    console.log('The table "users" is already exist');
    knexDB.schema.dropTable('users');
    console.log('Dropped table "users"');
  }

  createUserTable();
  fulFillUserTable();
  console.log(knexDB.select('login').table('users'));

    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });
    
    // rl.question('The table users is exist, do you want to rewrite it?', (answer: string) => {
      
    //   // TODO: Log the answer in a database
    //   console.log(`Thank you for your valuable feedback: ${answer}`);
    //   if (answer.toLowerCase === 'yes') {

    //   }
    
    //   rl.close();
    // });
});



