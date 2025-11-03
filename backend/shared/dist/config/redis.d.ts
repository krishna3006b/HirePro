import Redis from 'ioredis';
interface RedisConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
    keyPrefix?: string;
    maxRetriesPerRequest?: number;
}
export declare const connectRedis: (config: RedisConfig) => Redis;
export declare const getRedisClient: () => Redis;
export declare const disconnectRedis: () => Promise<void>;
declare const _default: {
    connectRedis: (config: RedisConfig) => Redis;
    getRedisClient: () => Redis;
    disconnectRedis: () => Promise<void>;
};
export default _default;
//# sourceMappingURL=redis.d.ts.map