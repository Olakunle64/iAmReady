-- Set up a MySQL server for the iAmReady website
-- MySQL setup development

CREATE DATABASE IF NOT EXISTS iAmReady_dev_db;
CREATE USER IF NOT EXISTS 'iAmReady_dev'@'localhost' IDENTIFIED BY 'iAmReady_dev_pwd';
GRANT ALL PRIVILEGES ON iAmReady_dev_db.* TO 'iAmReady_dev'@'localhost' WITH GRANT OPTION;
GRANT SELECT ON performance_schema.* TO 'iAmReady_dev'@'localhost' WITH GRANT OPTION;