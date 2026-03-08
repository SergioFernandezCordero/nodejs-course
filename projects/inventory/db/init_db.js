#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `CREATE table IF NOT EXISTS books (
    title VARCHAR (150) PRIMARY KEY,
    author VARCHAR (50),
    publishDate DATE NOT NULL,
    price INT,
    genre VARCHAR
);
INSERT INTO books (title, author, publishDate, price, genre)
VALUES
    ('Lord of the Rings', 'JRR Tolkien', '1954-01-01', 60, 'Epic Fantasy'),
    ('The Silmarillion', 'JRR Tolkien', '1977-01-01', 50, 'Epic Fantasy'),
    ('The Hobbit', 'JRR Tolkien', '1937-01-01', 50, 'Epic Fantasy'),
    ('Hyperion', 'Dan Simmons', '1989-01-01', 25, 'Science Fiction'),
    ('The Fall of Hyperion', 'Dan Simmons', '1990-01-01', 25, 'Sience Fiction'),
    ('Endymion', 'Dan Simmons', '1996-01-01', 15, 'Sience Fiction'),
    ('The Rise of Endymion', 'Dan Simmons', '1997-01-01', 10, 'Sicence Fictio'),
    ('On the Origin of Species', 'Charles Darwin', '1859-01-01', 42, 'Scientific essay'),
    ('Journal of researches into the natural history and geology of the countries visited during the voyage of H.M.S. Beagle round the world', 'Charles Darwin', '1839-01-01', 32, 'Scientific essay');
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
        console.log(`${e} - Database already initialized?`);
        throw new Error(e);
    }
    console.log("Done!");
}

main();