USE baseddata;

INSERT INTO department 
    (name) 
VALUES 
    ("Info Sec"),
    ("Management"),
    ("IT"),
    ("HR");

INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ("Desktop Support", 52, 3),
    ("Help Desk", 48, 3),
    ("Info Assurance Analyst", 100, 2),
    ("Director", 120, 2),
    ("HR Rep", 40, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ("Richard", "Ayoade", 2, NULL),
    ("Chris", "O'Dowd", 1, 1),
    ("John", "Wick", 3, NULL),
    ("Terry", "Francona", 4, 3),
     ("Pam", "Poovey", 5, 5);