import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL_MONGODB;
// const CONNECTION_URL = 'mongodb://localhost:27017/test';

function newConnection(uri) {
  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on('connected', function () {
    console.log(`Mongodb:: connected::${this?.modelNames()}`);
  });

  conn.on('disconnected', function () {
    console.log(`Mongodb:: disconnected::${this?.modelNames()}`);
  });

  conn.on('error', function (error) {
    console.log(`Mongodb:: error::${JSON.stringify(error)}`);
  });

  process.on('SIGINT', async () => {
    await conn.close();
    process.exit(0);
  });

  return conn;
}

// make some connection
export const myBlogConnection = newConnection(CONNECTION_URL);
