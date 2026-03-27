-- ──────────────────────────────────────────────────────────────
--  1. EMPLOYEES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE employees (
    emp_id      INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)   NOT NULL,
    department  VARCHAR(50)    NOT NULL,
    salary      DECIMAL(10,2)  NOT NULL,
    hire_date   DATE           NOT NULL,
    manager_id  INT            DEFAULT NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

-- Insert managers first (no manager_id)
INSERT INTO employees (emp_id, name, department, salary, hire_date, manager_id) VALUES
(1,  'Arjun Sharma',    'Engineering',  95000.00, '2018-03-15', NULL),
(2,  'Priya Nair',      'Marketing',    85000.00, '2019-07-01', NULL),
(3,  'Ravi Kumar',      'Sales',        78000.00, '2017-11-20', NULL),
(4,  'Sneha Iyer',      'HR',           72000.00, '2020-01-10', NULL),
(5,  'Karthik Menon',   'Engineering',  92000.00, '2019-05-22', NULL);
Select * from employees
-- Insert team members (with manager_id)
INSERT INTO employees (emp_id, name, department, salary, hire_date, manager_id) VALUES
(6,  'Divya Pillai',    'Engineering',  62000.00, '2021-06-14', 1),
(7,  'Anand Rajan',     'Engineering',  58000.00, '2022-02-28', 1),
(8,  'Meena Suresh',    'Engineering',  71000.00, '2020-09-05', 5),
(9,  'Vijay Prasad',    'Engineering',  99000.00, '2022-08-17', 1),  -- earns more than manager (Q11)
(10, 'Lakshmi Devi',    'Marketing',    47000.00, '2022-03-12', 2),
(11, 'Rohan Bose',      'Marketing',    53000.00, '2021-11-30', 2),
(12, 'Nisha Gupta',     'Marketing',    61000.00, '2020-07-19', 2),
(13, 'Amit Joshi',      'Sales',        45000.00, '2023-01-05', 3),
(14, 'Pooja Mehta',     'Sales',        80000.00, '2022-06-10', 3),  -- earns more than manager (Q11)
(15, 'Suresh Reddy',    'Sales',        38000.00, '2023-04-18', 3),
(16, 'Kavitha Rao',     'HR',           42000.00, '2022-11-22', 4),
(17, 'Deepak Singh',    'HR',           55000.00, '2021-08-08', 4),
(18, 'Usha Krishnan',   'Engineering',  66000.00, '2022-07-15', 5),
(19, 'Manoj Verma',     'Marketing',    49000.00, '2023-02-01', 2),
(20, 'Saranya Pillai',  'Sales',        52000.00, '2021-05-25', 3);

-- ──────────────────────────────────────────────────────────────
--  2. CUSTOMERS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE customers (
    customer_id  INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) NOT NULL,
    city         VARCHAR(50)  NOT NULL
);
select * from customers
INSERT INTO customers (customer_id, name, email, city) VALUES
(1,  'Rahul Aggarwal',   'rahul.a@email.com',    'Chennai'),
(2,  'Sita Ramesh',      'sita.r@email.com',     'Bangalore'),
(3,  'Mohan Lal',        'mohan.l@email.com',    'Mumbai'),
(4,  'Geetha Nair',      'geetha.n@email.com',   'Bangalore'),
(5,  'Raj Patel',        'raj.p@email.com',      'Delhi'),
(6,  'Asha Menon',       'asha.m@email.com',     'Chennai'),
(7,  'Nikhil Das',       'nikhil.d@email.com',   'Hyderabad'),
(8,  'Revathi Kumar',    'revathi.k@email.com',  'Mumbai'),
(9,  'Arun Nambiar',     'arun.n@email.com',     'Delhi'),
(10, 'Fathima Beevi',    'fathima.b@email.com',  'Bangalore');

-- ──────────────────────────────────────────────────────────────
--  3. PRODUCTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE products (
    product_id  INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(150) NOT NULL,
    category    VARCHAR(50)  NOT NULL,
    price       DECIMAL(10,2) NOT NULL,
    stock_qty   INT           NOT NULL
);
Select * from products
INSERT INTO products (product_id, name, category, price, stock_qty) VALUES
-- Electronics (mix of price tiers for Q7)
(1,  'Wireless Headphones',      'Electronics',  1200.00, 50),
(2,  'USB-C Hub',                'Electronics',   850.00, 120),
(3,  'Bluetooth Speaker',        'Electronics',   450.00, 80),
(4,  'Mechanical Keyboard',      'Electronics',   750.00, 60),
(5,  'Webcam HD 1080p',          'Electronics',   350.00, 90),
-- Furniture
(6,  'Ergonomic Chair',          'Furniture',    1500.00, 20),
(7,  'Standing Desk',            'Furniture',    1100.00, 15),
(8,  'Laptop Stand',             'Furniture',     499.00, 70),
(9,  'Monitor Arm',              'Furniture',     620.00, 40),
(10, 'Desk Drawer Organiser',    'Furniture',     280.00, 100),
-- Stationery
(11, 'Premium Notebook Set',     'Stationery',    400.00, 200),
(12, 'Gel Pen Pack (12)',        'Stationery',    120.00, 500),
(13, 'Sticky Note Bundle',       'Stationery',     80.00, 800),
(14, 'Desk Planner 2025',        'Stationery',    350.00, 150),
(15, 'Whiteboard Markers',       'Stationery',    200.00, 300);

-- ──────────────────────────────────────────────────────────────
--  4. ORDERS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE orders (
    order_id     INT PRIMARY KEY AUTO_INCREMENT,
    customer_id  INT  NOT NULL,
    order_date   DATE NOT NULL,
    amount       DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);   ADD
select * from orders
-- Dates designed so:
--   Customer 1 (Rahul)   → 5 orders, gap > 30 days between some (Q12)
--   Customer 2 (Sita)    → 4 orders
--   Customer 3 (Mohan)   → 3 orders
--   Customer 4 (Geetha)  → 3 orders
--   Customer 5 (Raj)     → 3 orders
--   Customers 6-10       → 1-2 orders each (below threshold for Q5)
--   Recent orders within 90 days of 2025-01-01 (for Q8)

INSERT INTO orders (order_id, customer_id, order_date, amount) VALUES
-- Customer 1 — 5 orders, gap between order 2 and 3 is 45 days (Q12)
(1,  1, '2024-01-10', 1200.00),
(2,  1, '2024-02-05', 850.00),
(3,  1, '2024-03-22', 1500.00),  -- 45-day gap from order 2
(4,  1, '2024-09-14', 700.00),   -- large gap (Q12)
(5,  1, '2024-12-20', 950.00),
-- Customer 2 — 4 orders (Q5)
(6,  2, '2024-02-18', 620.00),
(7,  2, '2024-04-30', 430.00),
(8,  2, '2024-07-11', 1100.00),
(9,  2, '2024-11-05', 550.00),
-- Customer 3 — 3 orders (Q5)
(10, 3, '2024-03-07', 2200.00),
(11, 3, '2024-06-19', 800.00),
(12, 3, '2024-10-28', 1350.00),
-- Customer 4 — 3 orders (Q5)
(13, 4, '2024-01-25', 480.00),
(14, 4, '2024-05-13', 920.00),
(15, 4, '2024-08-30', 670.00),
-- Customer 5 — 3 orders (Q5)
(16, 5, '2024-02-14', 1800.00),
(17, 5, '2024-07-22', 640.00),
(18, 5, '2024-11-09', 1050.00),
-- Customer 6 — 2 orders
(19, 6, '2024-04-02', 310.00),
(20, 6, '2024-09-17', 760.00),
-- Customer 7 — 1 order
(21, 7, '2024-06-05', 540.00),
-- Customer 8 — 2 orders
(22, 8, '2024-03-15', 980.00),
(23, 8, '2024-10-01', 420.00),
-- Customer 9 — 1 order
(24, 9, '2024-08-22', 1200.00),
-- Customer 10 — 2 orders, recent (Q8)
(25, 10, '2024-11-15', 870.00),
(26, 10, '2024-12-28', 1100.00);

-- ──────────────────────────────────────────────────────────────
--  5. ORDER_ITEMS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE order_items (
    item_id     INT PRIMARY KEY AUTO_INCREMENT,
    order_id    INT            NOT NULL,
    product_id  INT            NOT NULL,
    quantity    INT            NOT NULL,
    unit_price  DECIMAL(10,2)  NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO order_items (item_id, order_id, product_id, quantity, unit_price) VALUES
-- Order 1
(1,  1,  1,  1, 1200.00),
-- Order 2
(2,  2,  2,  1,  850.00),
-- Order 3
(3,  3,  6,  1, 1500.00),
-- Order 4
(4,  4,  4,  1,  700.00),
-- Order 5
(5,  5,  3,  2,  450.00),
(6,  5, 12,  1,  120.00),
-- Order 6
(7,  6,  9,  1,  620.00),
-- Order 7
(8,  7, 11,  1,  400.00),
(9,  7, 13,  3,   80.00),
-- Order 8
(10, 8,  7,  1, 1100.00),
-- Order 9
(11, 9,  5,  1,  350.00),
(12, 9, 14,  1,  350.00),
-- Order 10
(13, 10, 1,  1, 1200.00),
(14, 10, 6,  1, 1500.00),
-- Order 11
(15, 11, 2,  1,  850.00),
-- Order 12
(16, 12, 4,  1,  750.00),
(17, 12, 7,  1, 1100.00),
-- Order 13
(18, 13, 11, 1,  400.00),
(19, 13, 12, 2,  120.00),
-- Order 14
(20, 14, 9,  1,  620.00),
(21, 14, 5,  1,  350.00),
-- Order 15
(22, 15, 3,  1,  450.00),
(23, 15, 13, 5,   80.00),
-- Order 16
(24, 16, 7,  1, 1100.00),
(25, 16, 1,  1, 1200.00),
-- Order 17
(26, 17, 14, 1,  350.00),
(27, 17, 15, 3,  200.00),
-- Order 18
(28, 18, 6,  1, 1500.00),
-- Order 19
(29, 19, 13, 4,   80.00),
-- Order 20
(30, 20, 4,  1,  750.00),
-- Order 21
(31, 21, 2,  1,  850.00),
-- Order 22
(32, 22, 1,  1, 1200.00),
-- Order 23
(33, 23, 11, 1,  400.00),
-- Order 24
(34, 24, 6,  1, 1500.00),
-- Order 25
(35, 25, 8,  1,  499.00),
(36, 25, 9,  1,  620.00),
-- Order 26
(37, 26, 7,  1, 1100.00);

-- ──────────────────────────────────────────────────────────────
--  VERIFICATION QUERIES
--  Run these to confirm the data loaded correctly.
-- ──────────────────────────────────────────────────────────────

SELECT 'employees'  AS tbl, COUNT(*) AS rows1 FROM employees
UNION ALL
SELECT 'customers',  COUNT(*) FROM customers
UNION ALL
SELECT 'products',   COUNT(*) FROM products
UNION ALL
SELECT 'orders',     COUNT(*) FROM orders
UNION ALL
SELECT 'order_items',COUNT(*) FROM order_items;

-- Expected:
--   employees   → 20 rows
--   customers   → 10 rows
--   products    → 15 rows
--   orders      → 26 rows
--   order_items → 37 rows