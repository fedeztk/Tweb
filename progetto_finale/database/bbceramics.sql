-- bbceramics database creation

CREATE DATABASE IF NOT EXISTS `bbceramics` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bbceramics`;

-- user

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  name varchar(127) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar (63) NOT NULL,
  PRIMARY KEY (email)
);

-- artworks

DROP TABLE IF EXISTS artwork;
CREATE TABLE artwork (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(127) DEFAULT NULL,
  category varchar(127) NOT NULL,
  color varchar(127) NOT NULL,
  material varchar(127) NOT NULL,
  width float NOT NULL,
  height float NOT NULL,
  depth float,
  isEdible boolean NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO artwork  (name, category, material, color, width, height, depth, isEdible, price)
VALUES
("Omaggio a Matisse n.3", "vaso", "terra bianca", "bianco,nero,rosso", 15.5, 24.5, 5, true, 150),
("Omaggio a Matisse n.2", "vaso", "terra nera", "nero,azzurro", 11, 26, 4.7, true, 100),
("Omaggio a Matisse n.1", "vaso", "terra bianca", "bianco,blu", 12, 16.5, 4.5, true, 100),

("Ciotola Mexico", "piatto", "terra rossa", "giallo, verde", 10, 2, null, true, 10),
("Piatto piccolo Mexico", "piatto", "terra rossa", "giallo, verde", 19.5, 1.5, null, true, 10),
("Piatto ovale Mexico", "piatto", "terra rossa", "giallo, verde", 28, 2, 21.5, true, 15),
("Piatto rettangolare Mexico", "piatto", "terra rossa", "giallo, verde", 16.5, 2.5, 15, true, 15),

("Il ciccione felice", "scatola", "terra bianca", "bianco", 10.5, 10.5, 9.5, true, 20),

("Mandala 1", "ciotola", "terra bianca", "bianco", 7.5, 2, null, true, 10),
("Mandala 2", "ciotola", "terra bianca", "bianco", 12.5, 4, null, true, 10),

("Bicchiere", "bicchiere", "terra rossa", "blu,terra cotta", 6.5, 7, null, true, 10),

("Beba", "vaso,scultura", "terra rossa", "bianco", 6.5, 6.5, 9.5, true, 25),

("Il bricco del Re", "bricco", "terra bianca", "bianco", 9, 7, 7, true, 20),

("Mani 1", "scultura", "terra raku", "nero,azzurro", 16, 13, 14, false, 70),
("Mani 2", "scultura", "terra raku", "nero,verde", 28, 12, 17, false, 100),

("Ciotola", "ciotola", "terra raku", "bianco,nero,azzurro", 9.5, 8.5, null, false, 15),
("Ciotola", "ciotola", "terra raku", "nero,azzurro", 10, 8.5, null, false, 20),
("Maschera", "maschera", "terra raku", "giallo,nero,blu,rosso", 5, 8, 4.5, false, 20),

("Foglia lunga", "ciotola", "terra rossa", "verde", 14, 1.5, 3.5, true, 10),
("Foglia tonda", "ciotola", "terra rossa", "verde", 10, 1.5, 6, true, 10),
("Foglia", "ciotola", "terra rossa", "rosso", 10.5, 2.5, 5.5, true, 10),
("Foglia acero", "ciotola", "terra rossa", "rosso", 11.5, 3, 10, true, 10),

("Les ampurs", "vaso", "terra rossa", "terra cotta", 34.5, 13.5, 12.5, false, 120),

("Ovale con le zampe", "piatto", "terra bianca", "bianco", 25.5, 5, 17, true, 40);
