DROP TABLE IF EXISTS `sellerone`;

CREATE TABLE `sellerone` (
`id` int NOT NULL AUTO_INCREMENT,
`seller` VARCHAR(255) NOT NULL,
`comment` VARCHAR(255) NOT NULL,
`author` VARCHAR(255) NOT NULL,
`rating` INT(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
    
INSERT INTO `sellerone` (seller, comment, author, rating)
VALUES ('opportunity', 'I like this new graviton technology', 'Captain Filip', 4);

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
`id` int NOT NULL AUTO_INCREMENT,
`firstname` VARCHAR(255) NOT NULL,
`lastname` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`comment` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
    
INSERT INTO `contacts` (firstname, lastname, email, comment)
VALUES ('Captain', 'Flam', 'captainflam@clubdorothé', 'it is super i needed a new technology');