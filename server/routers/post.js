import express from 'express';
import {
  createPosts,
  getPosts,
  likePost,
  getPostsByUserId,
  getPostById,
  getTags,
  updatePost,
  commentPost,
  deletePost,
} from '../controllers/post.js';
import { verifyAccessToken } from '../helpers/jwt-service.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/tags', getTags);
router.post('/create', verifyAccessToken, createPosts);
router.get('/:id', getPostById);

router.patch('/:id/like', verifyAccessToken, likePost);
router.delete('/:id/delete', verifyAccessToken, deletePost);
router.patch('/:id/update', verifyAccessToken, updatePost);
router.post('/:id/comment', verifyAccessToken, commentPost);
router.get('/user/:id', verifyAccessToken, getPostsByUserId);

export default router;
