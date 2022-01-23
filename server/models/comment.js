import mongoose from 'mongoose';
import { myBlogConnection } from '../helpers/connections-multi-mongodb.js';

const commentSchema = new mongoose.Schema({
  text: { type: String, trim: true, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default myBlogConnection.model('comments', commentSchema);
