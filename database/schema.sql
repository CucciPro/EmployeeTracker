DROP DATABASE IF EXISTS baseddata;
CREATE DATABASE baseddata;
USE baseddata;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT, 
    name VARCHAR(30) UNIQUE NOT NULL, 
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL, 
    salary DECIMAL(6,2) UNSIGNED NOT NULL, 
    department_id INT UNSIGNED NOT NULL, 
    PRIMARY KEY(id),
    CONSTRAINT fk_department
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT UNSIGNED NOT NULL, 
    manager_id INT UNSIGNED NULL,
    PRIMARY KEY(id),

    CONSTRAINT fk_role
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_manager
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL

);
