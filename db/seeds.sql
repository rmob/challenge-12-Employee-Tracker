INSERT INTO department (dept_name)
VALUES  ('Electrical'),
        ('Camera'),
        ('Production'),
        ('Art'),
        ('SFX'),
        ('Wardrobe'),
        ('Sound');

INSERT INTO emp_role (title, salary, department_id)
VALUES  ('Gaffer', 1000, 1),
        ('Grip', 900, 1),
        ('Focus Puller', 8000, 2),
        ('Director of Photography', 10000, 2),
        ('First Camera Assistant', 500, 2),
        ('Second Camera Assistant', 300, 2),
        ('DIT', 3000, 2),
        ('Producer', 5000, 3),
        ('Line Producer', 4000, 3),
        ('Production Assistant', 200, 3),
        ('Carpenter', 1000, 4),
        ('Painter', 1000, 4),
        ('Props', 900, 4),
        ('Make-up', 3000, 5),
        ('Pyrotechnic', 5000, 5),
        ('MoCap', 6000, 5),
        ('Costume Designer', 8000, 6),
        ('Stylist', 2000, 6),
        ('Recordist', 5000, 7),
        ('Editor', 8000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Cyrus', 'Frydman', 5, 2)