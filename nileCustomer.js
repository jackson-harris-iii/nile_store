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
            if (levels) {
                console.log('good')
            }
            else {
                console.log('nope')
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
        return true
    }
    else {
        return false
    }
}