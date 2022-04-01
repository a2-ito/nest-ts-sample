-- CREATE EXTENSION pgaudit;
-- CREATE ROLE rds_pgaudit WITH LOGIN;
-- CREATE ROLE rds_pgaudit;

-- ALTER ROLE rds_pgaudit WITH SUPERUSER;
-- GRANT ALL ON DATABASE test01 TO pgaudit_role;

-- ALTER DATABASE testdb set pgaudit.log='All';

create table Users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO Users
    (id, name, firstname, lastname, email)
VALUES
    (1, 'sample1', 'sample1_firstname', 'sample1_lastname', 'sample1@example.com');
INSERT INTO Users
    (id, name, firstname, lastname, email)
VALUES
    (2, 'sample2', 'sample2_firstname', 'sample2_lastname', 'sample2@example.com');

