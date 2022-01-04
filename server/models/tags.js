import mongoose from 'mongoose';

const tagsSchema = new mongoose.Schema({
    name: { type: String, default: 'tagList' },
    tagList: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('tags', tagsSchema);
