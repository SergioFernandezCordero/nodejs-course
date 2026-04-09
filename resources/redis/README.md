# Redis Local Environment

## Initialization
- Create a file .env using env.sample and change the REDIS_PASS variable to a value you like.
- Run Docker Compose:
```
docker compose up --build
```

## Usage
#### You can connect from your favorite application using the password defined in REDIS_PASS, for example:

- Install redis-cli locally if you need it:
```
sudo apt install redis-tools
```
- Connect to Redis using password:
```
redis-cli --askpass
Please input password: *************
127.0.0.1:6379>
```
- Enjoy!