import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
        type: { fileName: String, filePath: String, fileType: String, fileSize: String },
        default: { fileName: '', filePath: '', fileType: '', fileSize: '' },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('user', userSchema);
