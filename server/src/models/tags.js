import mongoose from 'mongoose';
import { myBlogConnection } from '../helpers/connections-multi-mongodb.js';

export const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now() },
});

export default myBlogConnection.model('tags', tagSchema);
