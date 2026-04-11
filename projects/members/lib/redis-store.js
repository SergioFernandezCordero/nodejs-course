const { RedisStore } = require("connect-redis")
const { createClient } = require("redis");
const redisPrefix = process.env.REDIS_PREFIX || "members";

function initiatizeRedisSessionStorage() {
    try {
        // Initialize client.
        let redisClient = createClient()
        redisClient.connect().catch(console.error)
        // Initialize store.
        let redisStore = new RedisStore({
            client: redisClient,
            prefix: redisPrefix,
        })
        return redisStore;
    } catch(err) {
        console.log(err)
        throw Error(err)
    }
};

module.exports = {
    initiatizeRedisSessionStorage
}