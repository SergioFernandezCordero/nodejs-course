# Inventory

This a sample app to manage book inventories,

Has one entity, book, which has the characteristics title, author and genre.
Every book have these characteristics.

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
