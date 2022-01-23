import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({ url: REDIS_URL });

redisClient
  .connect()
  .then(() => console.log('Redis Client Connected'))
  .catch(() => console.log('Redis Client Error'));

export default redisClient;
