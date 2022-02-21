import PostService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
  try {
    const postList = await PostService.getAllPosts(req);
    res.status(200).json(postList);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, next) => {
  try {
    const data = await PostService.createPost(req, next);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getTags = async (req, res) => {
  try {
    const objTag = await PostService.getTags();
    res.status(200).json(objTag);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await PostService.getPostById(req, next);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const data = await PostService.deletePost(req, next);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const newPost = await PostService.updatePost(req);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const comments = await PostService.commentPost(req, next);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json(error);
  }
};
