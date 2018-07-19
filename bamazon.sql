DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db; 

CREATE TABLE products(
 id INT AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(100) NULL,
 department_name VARCHAR(100) NULL,
 price DECIMAL(10.2) NULL,
 stock_quantity INT NULL,
 
PRIMARY KEY (id)
);

INSERT into products (product_name,department_name,price,stock_quantity) 
values ('toothpaste','oral hygiene', '20.00', '100' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('tooth brush','oral hygiene', '10.00', '150' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('mouthwash','oral hygiene', '6.00', '80' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('dental floss','oral hygiene', '8.00', '100' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('shampoo','hair essentials', '18.00', '20' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('conditioner','hair essentials', '12.00', '40' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('chainsaw','tools', '180.00', '10' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('large bags','tools', '50.00', '100' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('duck tape','tape', '10.00', '200' );
INSERT into products (product_name,department_name,price,stock_quantity) 
values ('shovel','tools', '40.00', '90' );

SELECT * FROM products;