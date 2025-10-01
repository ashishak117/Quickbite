CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(500),
  phone VARCHAR(50),
  address VARCHAR(500),
  role VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS restaurant (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  about TEXT,
  address VARCHAR(500),
  email VARCHAR(200),
  phone VARCHAR(100),
  image VARCHAR(500),
  approved BOOLEAN DEFAULT FALSE,
  denied_message VARCHAR(1000),
  owner_id BIGINT
);

CREATE TABLE IF NOT EXISTS menu_item (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT,
  name VARCHAR(255),
  price DOUBLE,
  veg BOOLEAN,
  image VARCHAR(500),
  published BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT,
  customer_id BIGINT,
  total_amount DOUBLE,
  delivery_charge DOUBLE,
  payment_method VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_item (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT,
  item_id BIGINT,
  name VARCHAR(255),
  price DOUBLE,
  qty INT,
  veg BOOLEAN
);
