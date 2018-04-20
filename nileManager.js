const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'nile_db',
    multipleStatements: true
})

function Item(product_name, department_name, price, stock_qty) {
    this.product_name = product_name
    this.department_name = department_name
    this.price = parseInt(price).toFixed(2)
    this.stock_qty = parseInt(stock_qty).toFixed(2)
}

function viewProd() {
    let sql = 'SELECT * FROM products'
    connection.query(sql, (err,res) => {
        console.log(res)
    })
}

function viewLow() {
    let sql = 'SELECT * FROM products'
    connection.query(sql, (err, res) => {
        console.log('Low Quantity Products:')
        res.forEach(element => {
            let check = qtyCheck(element.stock_qty)
            if (check){
                console.log(element.product_name)
            }
        });
    })
}
//function to check it the stock of an item is below a certain amount
function qtyCheck(qty) {
    if (qty < 20){
        return true
    }
}

function addInv(itemData) {
    let newItem = new Item(
        itemData.product_name,
        itemData.department_name,
        itemData.price,
        itemData.stock_qty   
    )
    let details = Object.values(newItem)
    console.log(details)
    let sql = 'INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?, ?, ? ,?)'
    
    connection.query(sql, details, (err, res, field) => {
        console.log(err)
        console.log(field)
    } )
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