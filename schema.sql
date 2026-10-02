CREATE DATABASE IF NOT EXISTS superstore;
USE superstore;
CREATE TABLE orders (
  row_id INT PRIMARY KEY, order_id VARCHAR(20), order_date DATE, ship_date DATE,
  ship_mode VARCHAR(20), customer_id VARCHAR(10), customer_name VARCHAR(40),
  segment VARCHAR(20), country VARCHAR(30), city VARCHAR(40), state VARCHAR(30),
  postal_code VARCHAR(10), region VARCHAR(10), product_id VARCHAR(20),
  category VARCHAR(20), sub_category VARCHAR(20), product_name VARCHAR(150),
  sales DECIMAL(10,4), quantity INT, discount DECIMAL(4,2), profit DECIMAL(10,4)
);
