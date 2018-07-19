# bamazon

This program is an Amazon-like storefront built using Node & MySQL. 

Bamazon will take in orders from customers and deplete stock from the store's inventory.

App description:

1) A database of at least 10 items was created using MySQL.

![Screenshot](/images/bamazon_db.png)

2) A Node application called bamazonCustomer.js was created. The application will display a table of all available items

![Screenshot](products_db.png)

The user will then select an item

![Screenshot](/images/prodselect.png)

as well as a quantity. The app will then calculate a total bill for the item purchased and ask the user if they would like to continue purchasing items.

![Screenshot](/images/prodquant.png)

If a positive response is provided, the updated table will be presented

![Screenshot](/images/productyes.png)

If a negative response is provided, the app will exit

![Screenshot](/images/productno.png)

3) A Node application called bamazonManager.js was created. This application will currently allow the manager to view all products as well as low inventories, although all menus are displayed below.

![Screenshot](/images/managerintro.png)

Display all products:

![Screenshot](/images/managerview.png)

View low inventory:

![Screenshot](/images/managerlow.png)





