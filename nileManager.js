const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'nile_db',
    multipleStatements: true
})

function viewProd() {
    let sql = 'SELECT * FROM products'
    connection.query(sql, (err,res) => {
        console.log(res)
    })
}

function viewLow() {
    console.log('yep')
}

const manager = {
    viewProd: viewProd,
    viewLow: viewLow,
}

module.exports = { manager }