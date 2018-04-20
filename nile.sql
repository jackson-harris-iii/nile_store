DROP DATABASE IF EXISTS nile_db;
CREATE DATABASE nile_db;

USE nile_db;

CREATE TABLE products (
    item_id INTEGER(25) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(15),
    department_name VARCHAR(15),
    price decimal(15, 2),
    stock_qty INTEGER(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('iron', 'household', 25, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('speakers', 'electronics', 250, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('vacuum', 'household', 125, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('lamp', 'household', 15, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('iron', 'household', 25, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('monitor', 'electronics', 115, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('keyboard', 'outdoor', 25, 30);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('MacBook Pr', 'electronics', 2575, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('tent', 'outdoor', 199, 30);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('4k TV', 'electronics', 2500, 15);