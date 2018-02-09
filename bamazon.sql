CREATE database bamazon;

DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;


CREATE TABLE products (
item_id INT(11) NOT NULL,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,4) NULL,
stock_quantity INT NULL

);

SELECT * FROM products;
