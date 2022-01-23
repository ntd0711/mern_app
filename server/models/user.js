import mongoose from 'mongoose';
import { myBlogConnection } from '../helpers/connections-multi-mongodb.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },

  avatar: { type: String, default: '' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default myBlogConnection.model('users', userSchema);
