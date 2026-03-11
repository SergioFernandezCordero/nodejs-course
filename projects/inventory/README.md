# Inventory

This a sample app to manage book inventories,

Has three entities:
- Cathegory: list of possible cathegories for books
- Author: List of authors for books, with additional info.
- Book: List of books, with assigned author and cathegory

See db/init.js for reference

## Initialization

- Set a copy of .env-sample file and complete the database information
- Run db/init_db.js for a inital set of data:
```
node --env-file=.env db/init_db.js
```
- Run the app as usual:
```
node --env-file=.env --watch app.js
```
