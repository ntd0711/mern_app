import PostModel from '../models/post.js';
import TagModel from '../models/tags.js';
import CommentModel from '../models/comment.js';
import UserModel from '../models/user.js';

import createError from 'http-errors';
import { postValidate } from '../helpers/validation.js';
import { checkStatusVotePost } from '../helpers/common.js';

const PostService = {};

PostService.getAllPosts = async (req) => {
  const userId = req?.userId;
  const { search, tag } = req.query;
  const title = search ? new RegExp(search, 'i') : search;

  const condition =
    search && tag
      ? { title, tags: { $all: tag } }
      : search || tag
      ? { $or: [{ title }, { tags: { $all: tag } }] }
      : {};

  const postList = await PostModel.find(condition)
    .select('-comments')
    .populate('author', 'name')
    .sort({ createdAt: 'desc' });

  //check status vote and save
  for (let post of postList) {
    const { likes, dislikes, usersSaved } = post;

    post.statusVote = checkStatusVotePost(likes, dislikes, userId);
    post.point = likes.length - dislikes.length;
    post.savedByUser = usersSaved?.includes(userId);
  }

  return postList;
};

PostService.createPost = async (req, next) => {
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

    const newPostPromise = PostModel.create({
      ...post,
      tags: tagsFromClient,
      author: req?.userId,
      createdAt: Date.now(),
    });
    const tagsPromise = TagModel.find({}).select('name');
    const userPromise = UserModel.findOne({ _id: req.userId });

    const [newPost, tags, user] = await Promise.all([newPostPromise, tagsPromise, userPromise]);

    user.createdPosts.addToSet(newPost);
    await user.save();

    const objTag = tags.reduce((obj, item) => {
      const tagName = item.name;
      obj[tagName] ? (obj[tagName] = obj[tagName] + 1) : (obj[tagName] = 1);

      return obj;
    }, {});

    return { authorId: req.userId, newPost, allTagsPost: objTag };
  }
};

PostService.getPostById = async (req, next) => {
  const userId = req.userId;
  const { id } = req.params;

  const post = await PostModel.findById(id)
    .populate({
      path: 'comments',
      options: { sort: { createdAt: 'desc' } },
      populate: { path: 'user', select: ['avatar', 'name'] },
    })
    .populate('author', ['name', 'avatar', 'createdAt']);

  if (!post) next(createError.BadRequest('This post does not exist or has been deleted'));

  const { likes, dislikes, usersSaved } = post;

  //check status vote and save
  post.statusVote = checkStatusVotePost(likes, dislikes, userId);
  post.point = likes.length - dislikes.length;
  post.savedByUser = usersSaved?.includes(userId);

  return post;
};

PostService.getTags = async () => {
  const tags = await TagModel.find({}).select('name');

  const objTag = tags.reduce((obj, item) => {
    const tagName = item.name;
    obj[tagName] ? (obj[tagName] = obj[tagName] + 1) : (obj[tagName] = 1);

    return obj;
  }, {});

  return objTag;
};

PostService.deletePost = async (req, next) => {
  const userId = req?.userId;
  const { id } = req.params;
  if (!id) return next(createError.BadRequest());

  const { author, tags, comments } = await PostModel.findById(id);
  if (req.userId !== author) return next(createError.BadRequest());

  const user = await UserModel.findOne({ _id: userId });
  user.createdPosts = user.createdPosts.filter((postId) => String(postId) !== id);

  //delete tags
  for (const tag of tags) {
    await TagModel.deleteOne({ name: tag });
  }

  //delete comments
  for (const comment of comments) {
    await CommentModel.deleteOne({ _id: comment });
  }

  await Promise.all([PostModel.findByIdAndDelete(id), user.save()]);

  return { authorId: req.userId, postId: id };
};

PostService.updatePost = async (req) => {
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

  return updatedPost;
};

PostService.commentPost = async (req) => {
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

  const [newPost] = await Promise.all([postRelated.save(), userRelated.save()]);

  const comments = (
    await newPost.populate({
      path: 'comments',
      options: { sort: { createdAt: 'desc' } },
      populate: { path: 'user' },
    })
  ).comments;

  return comments;
};

export default PostService;
