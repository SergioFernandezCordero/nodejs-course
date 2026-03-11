#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE table IF NOT EXISTS genres (
    genre VARCHAR (150) PRIMARY KEY
);
CREATE table IF NOT EXISTS authors (
    fullname VARCHAR (150) PRIMARY KEY,
    country VARCHAR (50),
    birthdate DATE NOT NULL
);
CREATE table IF NOT EXISTS books (
    title VARCHAR (150) PRIMARY KEY,
    author VARCHAR (50) REFERENCES authors(fullname) ON DELETE RESTRICT,
    publishDate DATE NOT NULL,
    price INT,
    genre VARCHAR REFERENCES genres(genre) ON DELETE CASCADE
);
INSERT INTO genres (genre)
VALUES
    ('Science Fiction'),
    ('Scientific Essay'),
    ('Epic Fantasy'),
    ('Novel'),
    ('Poetry')
;
INSERT INTO authors (fullname, country, birthdate)
VALUES
    ('Dan Simmons', 'United States of America','04-04-1948'),
    ('JRR Tolkien', 'United Kingdom', '03-01-1892'),
    ('Charles Darwin', 'United Kingdom', '01-02-1809'),
    ('Victor Hugo', 'France', '02-26-1802'),
    ('Miguel de Cervantes', 'Spain', '09-29-1547')
;
INSERT INTO books (title, author, publishDate, price, genre)
VALUES
    ('Lord of the Rings', 'JRR Tolkien', '1954-01-01', 60, 'Epic Fantasy'),
    ('The Silmarillion', 'JRR Tolkien', '1977-01-01', 50, 'Epic Fantasy'),
    ('The Hobbit', 'JRR Tolkien', '1937-01-01', 50, 'Epic Fantasy'),
    ('Hyperion', 'Dan Simmons', '1989-01-01', 25, 'Science Fiction'),
    ('The Fall of Hyperion', 'Dan Simmons', '1990-01-01', 25, 'Science Fiction'),
    ('Endymion', 'Dan Simmons', '1996-01-01', 15, 'Science Fiction'),
    ('The Rise of Endymion', 'Dan Simmons', '1997-01-01', 10, 'Science Fiction'),
    ('On the Origin of Species', 'Charles Darwin', '1859-01-01', 42, 'Scientific Essay'),
    ('Journal of researches into the natural history and geology of the countries visited during the voyage of H.M.S. Beagle round the world', 'Charles Darwin', '1839-01-01', 32, 'Scientific Essay'),
    ('Don Quijote de la Mancha', 'Miguel de Cervantes', '1605-01-01', 66, 'Novel'),
    ('The Punishments','Victor Hugo','1853-01-01', 25 ,'Poetry')
;
`;

async function main() {
    console.log("Initializaing Books database...");
    try {
    const client = new Client({
        connectionString: `postgresql://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
    console.log("Done!");
}

main();