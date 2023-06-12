const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var Pool = require('pg').Pool;
const pool = new Pool(
  {
    user: 'postgres',
    host: 'localhost',
    database: 'taxiApp',
    password: 'Letsdoit!',
    port: 5432,
  });

  function createUser(request, response) {
    const { fullname, username, password, role } = request.body;
  
    pool.query(
      'INSERT INTO users (fullname, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [fullname, username, password, role],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  }
  


  // const jwt = require('jsonwebtoken');

  const getUsers = (request, response) => {
  pool.query('SELECT FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}
  

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, fullname } = request.body

  pool.query(
    'UPDATE users SET username = $1, fullname = $2 WHERE id = $3',
    [username, fullname, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`user modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('user deleted with ID: ${id}')
  })
}



module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
}
