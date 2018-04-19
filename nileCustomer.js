const iq = require('inquirer')
const mysql = require('mysql')
const mgr = require('./nileManager.js')

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
        choices: ['Shopping','Admin', 'exit'],
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

var adminOptions = [
    {
        type: 'input',
        name: 'password',
        message: 'please enter your password'
    }
]

var managerOptions = [
    {
        type: 'list',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'exit'],
        name: 'choice',
        message: 'What would you like to do?'
    }
]

//prompts the user with the homescreen options of their choice
function homeScreen() {
    prompt(homeOptions).then( res => {
        if (res.choice == 'Shopping'){
            console.log('yes')
            shopping()
        }
        else if (res.choice == 'admin') {
            adminLogin()
        }
        else {
            process.exit()
        }
    })
}

function shopping() {
    //asks the shopper what item they are looking to purchase.
    prompt(shoppingOptions).then( res => {
        let id = res.id
        
        //creates sql query string to search for items based on the item_id given by a shopper
        let sql = "SELECT * FROM products WHERE item_id = ?"
        
        connection.query(sql, id, (err, res) =>{
        cart = res[0]
        
        // asks the customer how many of a particular item they want to purchase
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

//checks to see if the stock qty of the request item is large enough to fill the order
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
    //create update sql query
    let sql = "UPDATE products SET stock_qty = ? WHERE item_id = ?"
    
    //update the db and show the customer their tx total upon success db update.
    connection.query(sql, [stock.value, cart.item_id], (err, res) => {
        // console.log(res.affectedRows + " record(s) updated")
        
        let cost = stock.amt * cart.price
        let tx = "Thank you for your purchase. Your total amount charged is $" + cost + ".00"
        console.log(tx)
    })
    
}

function managerShow() {
    
    // mgr.manager.viewProd()
    
    mgr.manager.viewLow()
   
}

function adminLogin() {
    prompt(adminOptions).then( res =>{
        switch (res.password) {
            case 'manager':
                managerPanel()
                break;
            case 'supervisor':
                supervisorPanel()
                break;
            default:
            console.log('incorrect password')
            homeScreen()
                break;
        }
    })
}
function managerPanel() {
    console.log('welcome manager')
    prompt(managerOptions).then( res => {
        switch(res.choice){
            case 'View Products for Sale':
                mgr.manager.viewProd()
                managerPanel()
                break;
            case 'View Low Inventory':
                mgr.manager.viewLow()
                managerPanel()
                break;
            case 'Add to Inventory':
                mgr.manager.addInv()
                managerPanel()
                break;
            case 'Add New Product':
                mgr.manager.addProd()
                managerPanel()
                break;
            default:
            console.log('Manager Logged Out.')
             homeScreen()
             break;        

        }
    })
}

function supervisorPanel() {
    console.log('welcome supervisor')
}
// managerShow()