# Homework 3

**Important!** Before run project there is need to **install PostgreSQL** and create database named **'node_hero'**.

To **fill** database use 
```node
  npm run fulfill-table-users
```

To **check connection** to database use 
```node
  npm run test-db-connect
```

To **start dev server** use 
```node
  npm run dev-server
```
Avaliable requests:

- GET: http://localhost:3000/user/{userId}<br>
  Example: `http://localhost:3000/user/12`<br>
  Return data of user with transmitted id.

- POST: http://localhost:3000/user/?login={login}&password={password}&age={age}<br>
  Example: `http://localhost:3000/user/?login=igor&password=qwer3&age=5`<br>
  Create new user.

- PUT: http://localhost:3000/user/2?[login={login}&password={password}&age={age}]<br>
  Example: `http://localhost:3000/user/12?login=vasya`<br>
  Update user with transmitted id.

- DELETE: http://localhost:3000/user/{userId}<br>
  Example: `http://localhost:3000/user/12`<br>
  Delete user with transmitted id.

- GET: localhost:3000/get-suggestions?loginSubstring={loginSubstring}&limit={limit}<br>
  Example: `localhost:3000/get-suggestions?loginSubstring=vas&limit=10`<br>
  Get auto-suggested users which login contains loginSubstring.
