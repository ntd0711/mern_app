import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    creatorId: { type: String },

    title: { type: String, required: true },
    htmlContent: { type: String, required: true },
    textContent: { type: String, required: true },
    description: { type: String, required: true },

    likes: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('posts', postSchema);
