SELECT region, ROUND(SUM(sales),2) AS total_sales, ROUND(SUM(profit),2) AS total_profit
FROM orders GROUP BY region ORDER BY total_sales DESC;

SELECT category, ROUND(SUM(profit),2) AS profit
FROM orders GROUP BY category ORDER BY profit DESC;

SELECT YEAR(order_date) AS yr, ROUND(SUM(sales),2) AS sales
FROM orders GROUP BY yr ORDER BY yr;

SELECT customer_name, ROUND(SUM(sales),2) AS total
FROM orders GROUP BY customer_name ORDER BY total DESC LIMIT 5;

SELECT discount, ROUND(AVG(profit),2) AS avg_profit, COUNT(*) AS orders
FROM orders GROUP BY discount ORDER BY discount;
