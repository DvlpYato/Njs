import mysql from 'mysql'
import dbconfig from '../connect/database'

let userModel = {}

userModel.getUsers = (callback) => {
  const conn = mysql.createConnection(dbconfig.connection) //CREAMOS LA CONECCION
  if (conn) {
    conn.query('SELECT * FROM user', (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, rows)
        conn.end()
      }
    })
  }
}

userModel.CheckUsername = (username, callback) => {
  const conn = mysql.createConnection(dbconfig.connection) //CREAMOS LA CONECCION
  if (conn) {
    conn.query(
      `SELECT * FROM user where username = '${username}'`,
      (err, rows) => {
        if (err) {
          throw err
        } else {
          callback(null, rows)
          conn.end()
        }
      }
    )
  }
}

userModel.getUserstologin = (username, password, callback) => {
  const conn = mysql.createConnection(dbconfig.connection) //CREAMOS LA CONECCION
  if (conn) {
    conn.query(
      `SELECT * FROM user where username = '${username}' and password = '${password}' ; `,
      (err, rows) => {
        if (err) {
          throw err
        } else {
          callback(null, rows)
          conn.end()
        }
      }
    )
  }
}

userModel.Insertuser = async (payload) => {
  return new Promise((resolve) => {
    console.log(payload)
    const conn = mysql.createConnection(dbconfig.connection)
    conn.query(
      `INSERT INTO user SET ?`,
      payload,
      function (error, results, fields) {
        if (error) throw error
        resolve(results)
      }
    )
  })
}

userModel.UpdateUser = (payload, callback) => {
  const conn = mysql.createConnection(dbconfig.connection)
  conn.query(
    `UPDATE user SET username=? ,password=? ,firstname=?,lastname=?,profile_img=? where u_id = ? `,
    [
      payload.username,
      payload.password,
      payload.firstname,
      payload.lastname,
      payload.profile_img,
      payload.u_id,
    ],
    (err, rows) => {
      if (err) {
        throw err
      } else {
        const result = Object.values(JSON.parse(JSON.stringify(rows)))
        conn.end()
      }
    }
  )
  const timestap = new Date().getTime()
  const data = {
    u_id: payload.u_id,
    password: payload.password,
  }
  conn.query(
    'INSERT INTO ch_history set ?',
    data,
    function (error, results, fields) {
      if (error) throw error
      callback(null, results)
    }
  )
}

userModel.CheckPass = (payload, callback) => {
  // return new Promise((resolve) => {
  //   const conn = mysql.createConnection(dbconfig.connection) //CREAMOS LA CONECCION
  //   if (conn) {
  //     conn.query(
  //       `SELECT * FROM ch_history where u_id = '${payload.u_id}' ORDER BY datetime DESC LIMIT 5; `,
  //       (err, rows) => {
  //         if (err) {
  //           throw err
  //         } else {
  //           const result = Object.values(JSON.parse(JSON.stringify(rows)))
  //           result.forEach((v) => {
  //             if (v.password === payload.password) {
  //               resolve('done')
  //             }
  //           })
  //           conn.end()
  //         }
  //       }
  //     )
  //   }
  // })
  const conn = mysql.createConnection(dbconfig.connection) //CREAMOS LA CONECCION
  let check_password = 0
  if (conn) {
    conn.query(
      `SELECT * FROM ch_history where u_id = '${payload.u_id}'  ORDER BY datetime DESC LIMIT 5; `,
      (err, rows) => {
        if (err) {
          throw err
        } else {
          const result = Object.values(JSON.parse(JSON.stringify(rows)))
          result.forEach((val) => {
            if (val.password === payload.password) {
              //console.log(val.password === payload.password)
              check_password++
            } else {
            }
          })
          callback(null, check_password)
          conn.end()
        }
      }
    )
  }
}

export default userModel
