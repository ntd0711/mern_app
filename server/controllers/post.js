import PostModel from '../models/post.js';
import UserModel from '../models/user.js';
import TagsModel from '../models/tags.js';

export const createPosts = async (req, res) => {
    try {
        if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' });

        const post = req.body;

        if (post) {
            const { tagList } = await TagsModel.findOne({ name: 'tagList' });

            if (!tagList) {
                await TagsModel.create({
                    name: 'tagList',
                    tagList: [],
                });
            }
            const newTagList = Array.from(new Set([...post.tags?.split(' '), ...tagList]));

            const newPostPromise = PostModel.create({
                ...post,
                tags: post.tags?.split(' '),
                creatorId: req?.userId,
            });
            const tagsPromise = TagsModel.findOneAndUpdate(
                { name: 'tagList' },
                { tagList: newTagList },
                { new: true }
            );

            const [newPost, tagsPost] = await Promise.all([newPostPromise, tagsPromise]);
            res.status(200).json({ newPost, allTagsPost: tagsPost.tagList });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const getPosts = async (req, res) => {
    try {
        const { search, tags } = req.query;

        let postList = [];
        if (search || tags) {
            const title = search ? new RegExp(search, 'i') : search;
            // postList = await PostModel.find({ tags: { $all: tags?.split(' ') } });
            postList = await PostModel.find({
                $or: [{ title }, { tags: { $all: tags?.split(' ') } }],
            });
        } else {
            postList = await PostModel.find({});
        }

        const postUpdated = [];
        for (const post of postList) {
            const { name } = await UserModel.findOne({ _id: post.creatorId });

            post.creator = name;
            postUpdated.push(post);

            await PostModel.create(post);
        }

        res.status(200).json(postUpdated);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const getTags = async (req, res) => {
    try {
        const { tagList } = await TagsModel.findOne({ name: 'tagList' });
        res.status(200).json(tagList);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
};

export const getPostsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const postList = await PostModel.find({});
        const postCreatedByUser = postList.filter((post) => post.creatorId === String(id));

        res.status(200).json(postCreatedByUser);
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
