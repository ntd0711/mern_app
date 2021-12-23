import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    creatorId: { type: String },
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('posts', postSchema);
