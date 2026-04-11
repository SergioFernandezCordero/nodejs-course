#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE table IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (150) UNIQUE,
    password VARCHAR (150),
    firstname VARCHAR (50),
    lastname VARCHAR (50),
    ismember BOOLEAN DEFAULT FALSE
);
CREATE table IF NOT EXISTS messages (
    author INTEGER REFERENCES users(id) ON DELETE CASCADE,
    timestamp DATE NOT NULL,
    content VARCHAR (250)
);
`;

async function main() {
    console.log("Initializaing MessagePanel database...");
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