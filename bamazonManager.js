var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table"); // Found after searching for ways to organize tables in node. https://www.npmjs.com/package/console.table

//Step 1: connect to mysql
var connection = mysql.createConnection({
    host: "localhost",

    // Your port, if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "sur@baya123",
    database: "bamazon_db",
});

//Step 2: connect to the database
connection.connect(function(err) {
    if (err) {throw err}
    console.log("Your user id is " + connection.threadId);
    menu();
});    

function menu() {
  var menuOptions = {
    type: "list",
    name: "bamazonMenu",
    message: "Welcome to the bamazon manager menu! Please select your option below: ",
    default: "Exit",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
  }
  
  inquirer.prompt(menuOptions)
    .then((answer) => {
      switch(answer.bamazonMenu) {
        case "Exit": 
          console.log('Exiting the program');
          process.exit()
          break;
        case "View Products for Sale":
          console.log('Viewing products');
          displayProducts();
          break;
        case "View Low Inventory":
          console.log('Viewing the low inventory');
          lowInventory();
          break;
        case "Add to Inventory":
          console.log('Adding to inventory');
          addtoInventory();
          break;
        case "Add New Product":
          console.log('Adding new product')
          break;
      }
      
    })

}
// View products for sale
function displayProducts() {
    connection.query("SELECT id,product_name,department_name,price,stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        menu();
      }
  );
};

// View low inventory
function lowInventory() {
    connection.query("SELECT id,product_name,department_name,price,stock_quantity FROM products WHERE stock_quantity <5", function(err, res) {
        if (err) throw err;
        console.table(res);
        menu();
      }
  );
};
   
// Add to inventory
function addtoInventory() {
    connection.query("Update id,product_name,department_name,price,stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        menu();
      }
  );
};
