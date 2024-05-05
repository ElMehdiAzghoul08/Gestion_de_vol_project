const mysql = require('mysql')
// 127.0.0.1
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'gestion_vol',
})

module.exports = connection;















// const {createPool} = require('mysql')

// const pool = createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'bilal2003',
//     database: 'gestion_vol',
//     connectionLimit: 10
// })

// pool.query('select * from clients', (err, result, fields) => {
//     if(err) throw err
//     console.log(result)
// })