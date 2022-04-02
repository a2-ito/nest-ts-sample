-- CREATE EXTENSION pgaudit;
-- CREATE ROLE rds_pgaudit WITH LOGIN;
-- CREATE ROLE rds_pgaudit;

-- ALTER ROLE rds_pgaudit WITH SUPERUSER;
-- GRANT ALL ON DATABASE test01 TO pgaudit_role;

-- ALTER DATABASE testdb set pgaudit.log='All';

CREATE database e2etest;

create table Users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO Users
    (id, name, firstname, lastname, email)
VALUES
    ('6a414c88-4613-486d-9990-80c1de52eea4', 'sample1', 'sample1_firstname', 'sample1_lastname', 'hoge@gmail.com');

\c e2etest

create table Users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO Users
    (id, name, firstname, lastname, email)
VALUES
    ('6a414c88-4613-486d-9990-80c1de52eea4', 'sample1', 'sample1_firstname', 'sample1_lastname', 'hoge@gmail.com');

