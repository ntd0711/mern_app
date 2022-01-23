import crypto from 'crypto';

const secret_key1 = crypto.randomBytes(32).toString('hex');
const secret_key2 = crypto.randomBytes(32).toString('hex');

console.table({ secret_key1, secret_key2 });
