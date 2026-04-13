const { RedisStore } = require("connect-redis")
const { createClient } = require("redis");
const redisPrefix = process.env.REDIS_PREFIX || "members";
const redisSecret = process.env.REDIS_PASS || "members";

function initiatizeRedisSessionStorage() {
    console.log("[Session Storage] Initialize Redis Session Storage")
    try {
        // Initialize client.
        let redisClient = createClient({
                username: 'default',
                password: redisSecret
            }
        )
        redisClient.connect().catch(console.error)
        // Initialize store.
        let redisStore = new RedisStore({
            client: redisClient,
            prefix: redisPrefix,
        })
        return redisStore;
    } catch(err) {
        console.log(`[Session Storage] - Error: ${err}`)
        throw Error(err)
    }
};

module.exports = {
    initiatizeRedisSessionStorage
}