import PostService from '../services/post.service.js';
import { asyncWrapper } from '../helpers/async-wrapper.js';

export const getAllPosts = asyncWrapper(async (req, res, next) => {
  const postList = await PostService.getAllPosts(req, next);
  res.status(200).json(postList);
});

export const createPost = asyncWrapper(async (req, res, next) => {
  const data = await PostService.createPost(req, next);
  res.status(200).json(data);
});

export const getTags = asyncWrapper(async (req, res, next) => {
  const objTag = await PostService.getTags(req, next);
  res.status(200).json(objTag);
});

export const getPostById = asyncWrapper(async (req, res, next) => {
  const post = await PostService.getPostById(req, next);
  res.status(200).json(post);
});

export const deletePost = asyncWrapper(async (req, res, next) => {
  const data = await PostService.deletePost(req, next);
  res.status(200).json(data);
});

export const updatePost = asyncWrapper(async (req, res, next) => {
  const newPost = await PostService.updatePost(req, next);
  res.status(200).json(newPost);
});

export const commentPost = asyncWrapper(async (req, res, next) => {
  const comments = await PostService.commentPost(req, next);
  res.status(200).json(comments);
});
