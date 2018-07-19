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
    afterConnection();
    console.log("To exit at any time, hit control + C");
});    

//Step 3: Display data in bash
function afterConnection() {
  connection.query("SELECT id,product_name,department_name,price,stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        productSelect(res);
      }
  );
};
//function which prompts the user to select a product
function productSelect(selection) {
  inquirer.prompt([
    {
    name: "id",
    type: "input",
    message: "Please enter the ID of the product you would like to purchase.",
    validate: function(value) {
        if (value <= 10 && value >= 1) {
            console.log("\n Great, we do carry this item! Let's move to the next question");
            return true;
        }
        else {
            console.log("\nPlease select an ID between 1 and 10. We can't give you what we don't carry.")
            return false;
        }
    }
    }
  ])


  .then(function(val) {
    console.log("You have selected",val);
    const customerChoice = parseInt(val.id);
    const product = checkStock(customerChoice, selection);


    //If the item id exists, reference the function that asks for the quanitity
    if (product) {
      customerQuantity(product);
    }
    else {
    //If the item is not available
      console.log("\nSorry, your choice exceeds our available inventory. Please try again next week.");
      afterConnection();
      console.log("To exit at any time, hit control + C");
    }
  });
}

//function to check the stock amount
function checkStock(userChoice, selection) {
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].id === userChoice) {
        return selection[i];
      }
    }
    // return null if not
    return null;
    };
    

//function to prompt user for how many items they want to buy

function customerQuantity(product){
inquirer.prompt([
  {
    name: "quantity",
    type: "input",
    message: "Please enter the quantity you would like to purchase for this item"
  }
])
.then(function(val) {
  var quantity = parseInt(val.quantity);


// if the item is not in stock
  if (quantity > product.stock_quantity) {
    console.log("\nSorry, your choice exceeds our available inventory. Please try again next week.");
    afterConnection();
    console.log("To exit at any time, hit control + C");
  }
  else {
    checkOut(product, quantity);
  }
});
}

// function to buy the item and update the database

function checkOut(product, quantity) {
connection.query(
  "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
  [quantity,product.id],
  function(err, res) {
// Checkout summary
    console.log("\nCheckout complete! You are now the owner of " + quantity + " " + product.product_name + "(s)!" + " Your bill is $" + (product.price * quantity) +".");
    buyAgain(); 
    console.log("To exit at any time, hit control + C");
  }
);
};

// function asks users if they would like to continue purchasing items -- suggested by Sam
function buyAgain(){
    var question = {
        name: "continue",
        type: "confirm",
        message: "Would you like to buy another item?",
    };
  inquirer.prompt(question)

  .then(function(answers) {
    // console.log(answers);
    if (answers.continue === true) {
        afterConnection();
    }
    else {
        console.log("Thank you! Come again!");
        connection.end();
        process.exit(0);
  } 
});
}




