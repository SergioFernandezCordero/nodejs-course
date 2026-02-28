# PostgreSQL Local Environment

## Initialization
- Create .env file using .env.sample file as an example
- Create directories db-data and pgadmin-data
- Change permissions on pgadmin-data folder: `sudo chown 5050:5050 pgadmin-data`
- Setup properly database credentials in servers.json for PG-ADMIN
- Run Docker Compose:
`docker compose up --build`

## Management and usage
- For management, point browser to PG_ADMIN console [http:///localhost:15433](/http://localhost:15433) and login with PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD. You will be required the password for LOCAL server on first access.
- For database access, point your app to host "localhost" and port "15432", and use POSTGRES_USER and POSTGRES_PASSWORD. The name of the database is, thus, "database". For instance: `psql -h localhost -p 15432 database database`
