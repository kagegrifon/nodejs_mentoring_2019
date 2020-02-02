import express from 'express';
import { userRouter } from './resourses/users/controller';

// import knex from 'knex';

// const dbConnectionParams = {
//   client: 'pg',
//   connection: {
//     host : 'localhost',
//     user : 'postgres',
//     password : 'dev',
//     database : 'node_hero'
//   }
// };

// const knexDB = knex(dbConnectionParams);
// knexDB.schema.hasTable('users').then(function(exists) {
//   console.log('The table users isExist = ', exists);
//   if (!exists) {
//     return knexDB.schema.createTable('users', function(t) {
//       t.increments('id').primary();
//       t.string('first_name', 100);
//       t.string('last_name', 100);
//     });
//   }
// });

// const PGClient = require('pg').Client;
// const initDBConnectParams = 'postgres://postgres:dev@localhost/node_hero';

// const pg = new PGClient(initDBConnectParams);

// pg.connect();

// pg.query('select * from users', (err: Error, results: any) => {
//   if (err) {
//     console.log(err);
//   }

//   const json = JSON.stringify(results);
//   console.log(json);
// })


// const conString = 'postgres://postgres:dev localhost/node_hero' // Убедитесь, что вы указали данные от вашей базы данных
// pg.connect(conString, function (err:any, client:any, done:any) {
//   if (err) {
//     return console.error('error fetching client from pool', err)
//   }
//   client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err:any, result:any) {
//     done()
//     if (err) {
//       return console.error('error happened during query', err)
//     }
//     console.log(result.rows[0])
//     process.exit(0)
//   })
// })


const app = express();
const port = 3000;

app.listen(port, () => console.log(`Start listening on port ${port}`));

// process.on('uncaughtException', () => console.log('uncaughtException'));
// process.on('SIGTERM', () => console.log('SIGTERM'));

// app.get('/', function (req, res) {
//   const taskDescribing = `
//   <h1>API description:</h1>
//     <ul>
//       <li>
//         get user by id: <b>GET</b> on url: {HOST}/user/:userId;
//       </li>
//       <li>add user: <b>POST</b> on url: {HOST}/user/{queries: login, password, age},<br>
//         queries description see in creatingUserSchema;
//       </li>
//       <li>
//         update user: <b>PUT</b> on url: {HOST}/user/:userId{queries: login, password, age},<br>
//         queries description see in updatingUserSchema;
//       </li>
//       <li>
//         delete user: <b>DELETE</b> on url: {HOST}/user/:userId;
//       </li>
//       <li>
//         get suggestion by name and limit: <b>GET</b> on url: {HOST}/user/get-suggestions{queries: loginSubstring, limit},<br>
//         queries description see in autoSuggestUserSchema;
//       </li>
//     </ul>
//   `;
//   res.send(taskDescribing);
// })

app.use('/user', userRouter);




