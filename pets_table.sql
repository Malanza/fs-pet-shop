DROP TABLE IF EXISTS pets;  
CREATE TABLE pets (
    id serial,
    name text,
    kind text,
    age integer
);


INSERT INTO pets (name, kind, age) VALUES ('fido', 'dog', 3);
INSERT INTO pets (name, kind, age) VALUES ('buttons', 'snake', 5);