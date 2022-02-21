import mongoose from 'mongoose';
import { myBlogConnection } from '../helpers/connections-multi-mongodb.js';

const postSchema = new mongoose.Schema({
  author: { type: String, required: true, ref: 'users' },

  title: { type: String, trim: true, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },

  likes: [{ type: [String], default: [] }],
  dislikes: [{ type: [String], default: [] }],
  point: { type: Number, default: 0 },
  statusVote: { type: String, default: 'notVote' },

  usersSaved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  savedByUser: { type: Boolean, default: false },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
  tags: { type: [String], lowercase: true, required: true },

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default myBlogConnection.model('posts', postSchema);
