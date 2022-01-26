import mongoose from 'mongoose';
import { myBlogConnection } from '../helpers/connections-multi-mongodb.js';

const postSchema = new mongoose.Schema({
  author: { type: String, required: true, ref: 'users' },

  title: { type: String, trim: true, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },

  likes: [{ type: [String], default: [] }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
  tags: { type: [String], lowercase: true, required: true },

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default myBlogConnection.model('posts', postSchema);
