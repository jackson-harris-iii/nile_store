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
    let sql = 'SELECT * FROM products'
    connection.query(sql, (err, res) => {
        res.forEach(element => {
            let check = qtyCheck(element.stock_qty)
            if (check){
                console.log('Quantity')
                console.log(element.product_name)
            }
        });
    })
}

function qtyCheck(qty) {
    if (qty < 20){
        return true
    }
}

function addInv() {
    
}

function addProd() {
    
}

const manager = {
    viewProd: viewProd,
    viewLow: viewLow,
    addInv: addInv,
    addProd: addProd
}

module.exports = { manager }