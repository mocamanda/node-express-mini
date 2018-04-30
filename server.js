const express = require('express');

// import db from './data/db';
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('API Running');
});

server.get('/api/users', (req, res) => {
  //get the users
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
      // do something with the error
    });
});

// /api/users/123
server.get('/api/users/:id', (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;
  db
    .findById(id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ message: 'User Not Found' });
      } else {
        res.json(users[0]);
      }
    })
    .catch(err => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

server.listen(8000, () => console.log('\n== API Running on port 8000 ==\n'));