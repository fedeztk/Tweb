CREATE DATABASE IF NOT EXISTS `bbceramics` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bbceramics`;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  name varchar(127) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar (63) NOT NULL,
  PRIMARY KEY (email)
);

DROP TABLE IF EXISTS artwork;
CREATE TABLE artwork (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(127) NOT NULL,
   varchar(127) NOT NULL,
  fattura varchar (63) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS artwork;
CREATE TABLE artwork (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(127) DEFAULT NULL,
  category varchar(127) NOT NULL,
  color varchar(127) NOT NULL,
  material varchar(127) NOT NULL,
  width float NOT NULL,
  height float NOT NULL,
  isEdible boolean NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO artwork  (name, category, color, material, width, height, isEdible)
VALUES
("ciao", "piatto", "blu", "argilla", 10.5, 5, true);

INSERT INTO artwork  (name, category, color, material, width, height, isEdible)
VALUES
(null, "vaso", "rosso", "argilla rossa", 15, 5, false);
