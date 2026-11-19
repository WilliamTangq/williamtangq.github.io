-- Fictional portfolio fixture for the Database & SQL query lab.
-- SQLite-compatible reference; not an assessed Oracle submission or business data.
PRAGMA foreign_keys = ON;
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price NUMERIC NOT NULL CHECK(price>=0));
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id), status TEXT NOT NULL, order_date TEXT NOT NULL);
CREATE TABLE order_items (order_id INTEGER NOT NULL REFERENCES orders(id), product_id INTEGER NOT NULL REFERENCES products(id), quantity INTEGER NOT NULL CHECK(quantity>0), PRIMARY KEY(order_id, product_id));
INSERT INTO customers VALUES (1,'Acme Studio'),(2,'Beacon Retail'),(3,'Cove Supply');
INSERT INTO products VALUES (11,'Laptop stand',40),(12,'Desk mat',25),(13,'Cable organiser',15);
INSERT INTO orders VALUES (101,1,'open','2026-03-10'),(102,2,'fulfilled','2026-03-11'),(103,1,'fulfilled','2026-03-12'),(104,3,'open','2026-03-13');
INSERT INTO order_items VALUES (101,11,2),(101,13,1),(102,12,4),(103,11,1),(103,12,2),(104,13,3);

-- Which customers spent the most?
SELECT c.name, SUM(oi.quantity * p.price) AS spend
FROM customers c
JOIN orders o ON o.customer_id=c.id
JOIN order_items oi ON oi.order_id=o.id
JOIN products p ON p.id=oi.product_id
GROUP BY c.id,c.name ORDER BY spend DESC;

-- Which orders are still open?
SELECT o.id,c.name,o.order_date
FROM orders o JOIN customers c ON c.id=o.customer_id
WHERE o.status='open' ORDER BY o.order_date;

-- What is on order 101?
SELECT p.name,oi.quantity,p.price,oi.quantity*p.price AS line_total
FROM order_items oi JOIN products p ON p.id=oi.product_id
WHERE oi.order_id=101;

-- An attempted line with order_id 999 must be rejected by the foreign key.
-- INSERT INTO order_items VALUES (999,11,1);
