import PostModel from '../models/post.js';
import TagModel from '../models/tags.js';
import CommentModel from '../models/comment.js';
import UserModel from '../models/user.js';

import createError from 'http-errors';
import { postValidate } from '../helpers/validation.js';

export const createPosts = async (req, res, next) => {
  try {
    const { error } = postValidate(req.body);
    if (error) return next(createError.BadRequest(error.details[0].message));

    const post = req.body;

    if (post) {
      const tagsFromClient = Array.from(new Set(post.tags?.split(' ').map((x) => x.toLowerCase())));

      const arrTag = tagsFromClient.reduce((arr, tag) => {
        arr.push({ name: tag, createdAt: Date.now() });
        return arr;
      }, []);

      await TagModel.create(arrTag);

      const newPostPrm = PostModel.create({
        ...post,
        tags: tagsFromClient,
        author: req?.userId,
        createdAt: Date.now(),
      });
      const tagsPrm = TagModel.find({}).select('name');

      const [newPost, tags] = await Promise.all([newPostPrm, tagsPrm]);

      const objTag = tags.reduce((obj, item) => {
        const tagName = item.name;
        obj[tagName] ? (obj[tagName] = obj[tagName] + 1) : (obj[tagName] = 1);

        return obj;
      }, {});

      res.status(200).json({ newPost, allTagsPost: objTag });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const title = search ? new RegExp(search, 'i') : search;

    let postList = [];

    if (search || tag) {
      postList = await PostModel.find({
        $or: [{ title }, { tags: { $all: tag } }],
      })
        .populate('author', 'name')
        .sort({ updatedAt: 'desc' });
    } else {
      postList = await PostModel.find({}).populate('author', 'name').sort({ updatedAt: 'desc' });
    }

    res.status(200).json(postList);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find({}).select('name');

    const objTag = tags.reduce((obj, item) => {
      const tagName = item.name;
      obj[tagName] ? (obj[tagName] = obj[tagName] + 1) : (obj[tagName] = 1);

      return obj;
    }, {});

    res.status(200).json(objTag);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id)
      .populate({
        path: 'comments',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'user', select: ['avatar', 'name'] },
      })
      .populate('author', ['name', 'avatar', 'createdAt']);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getPostsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const postList = await PostModel.find({ author: String(id) })
      .populate('author', 'name')
      .sort({ updatedAt: 'desc' });
    res.status(200).json(postList);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id).populate('author', 'name');
    const likedPost = post.likes.findIndex((id) => id === String(req.userId)) !== -1;

    if (likedPost) {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(createError.BadRequest());

    const { author, tags, comments } = await PostModel.findById(id);
    if (req.userId !== author) return next(createError.BadRequest());

    //delete tags
    for (const tag of tags) {
      await TagModel.deleteOne({ name: tag });
    }

    //delete comments
    for (const comment of comments) {
      await CommentModel.deleteOne({ _id: comment });
    }

    await PostModel.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = req.body;
    const { id } = req.params;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        ...post,
        tags: post.tags?.split(' ').map((tag) => tag?.toLowerCase()),
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const data = req.body;

    const comment = await CommentModel.create({
      text: data.text,
      post: data.postId,
      user: data.userId,
      createdAt: Date.now(),
    });

    const postQuery = PostModel.findOne({ _id: data.postId });
    const userQuery = UserModel.findOne({ _id: data.userId });

    const [postRelated, userRelated] = await Promise.all([postQuery, userQuery]);

    postRelated.comments.push(comment);
    userRelated.comments.push(comment);

    await Promise.all([postRelated.save(), userRelated.save()]);

    const comments = (
      await postRelated.populate({
        path: 'comments',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'user' },
      })
    ).comments;

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
