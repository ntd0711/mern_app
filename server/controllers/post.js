import PostModel from '../models/post.js';

export const createPosts = async (req, res) => {
    try {
        // if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' });

        const post = req.body;
        // const postForm = { creator, title, content, imageUrl };
        if (post) {
            const newPost = await PostModel.create({
                ...post,
                creatorId: req?.userId || 'idExample',
            });
            res.status(200).json(newPost);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const getPosts = async (req, res) => {
    try {
        const postList = await PostModel.find({});

        res.status(200).json(postList);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.userId) return res.status(404).json({ message: 'User is not logged in' });

        const post = await PostModel.findOne({ _id: id });
        const likedPost = post.likes.findIndex((id) => id === String(req.userId)) > -1;

        if (likedPost) {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        } else {
            post.likes.push(req.userId);
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
