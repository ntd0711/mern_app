import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    creatorId: { type: String },
    creatorAvatar: { type: String, default: '' },

    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },

    imageUrl: { type: String },
    likes: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('posts', postSchema);
