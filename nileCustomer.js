const iq = require('inquirer')
const mysql = require('mysql')

var cart = null

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'nile_db',
    multipleStatements: true
})

var prompt = iq.createPromptModule();

connection.connect(function (err) {
    if(err){
        console.log(err);
    }
    console.log('connected as id' + connection.threadId);
    homeScreen()
})

var homeOptions = [
    {
        type: 'list',
        choices: ['Shopping','Admin'],
        name: 'choice',
        message: 'Welcome to The Nile Store.'
    }
]

var shoppingOptions = [
    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the product you would like to buy?'
    }
]

var amountOptions = [
    {
        type: 'input',
        name: 'amt',
        message: 'How many would you like to purchase?'
    }
]


function homeScreen() {
    prompt(homeOptions).then( res => {
        if (res.choice == 'Shopping'){
            console.log('yes')
            shopping()
        }
        else {
            console.log('no')

        }
    })
}

function shopping() {
    prompt(shoppingOptions).then( res => {
        let id = res.id
        console.log(id)
        let sql = "SELECT * FROM products WHERE item_id = ?"
        connection.query(sql, id, (err, res) =>{
        cart = res[0]

        prompt(amountOptions).then( res => {
            let levels = checkStock(cart.stock_qty, res.amt)
            if (levels.result) {
                console.log('good')
                updateStock(levels)
            }
            else {
                console.log('Insufficient quantity!')
            }
        })
          
        }) 
    })
}

function checkStock(stock, qty) {
    console.log(stock)
    console.log(qty)
    let remaining = stock - qty
    if (remaining >= 0 ){
        let result =
        {
            result: true,
            value: remaining,
            amt: qty
        }
        return result
    }
    else {
        let result =
            {
                result: false,
            }
        return result
    }
}

function updateStock(stock) {
    console.log(stock.value)
    console.log(cart.item_id)
    let sql = "UPDATE products SET stock_qty = ? WHERE item_id = ?"
    
    connection.query(sql, [stock.value, cart.item_id], (err, res) => {
        // console.log(res.affectedRows + " record(s) updated")
        
        let cost = stock.amt * cart.price
        let tx = "Thank you for your purchase. Your total amount charged is $" + cost + ".00"
        console.log(tx)
    })
    
}