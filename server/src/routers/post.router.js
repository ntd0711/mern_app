import express from 'express';
import {
  commentPost,
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getTags,
  updatePost,
} from '../controllers/post.controller.js';
import { integratedAccessToken, verifyAccessToken } from '../helpers/jwt-service.js';

const router = express.Router();

router.get('/', integratedAccessToken, getAllPosts);
router.get('/tags', getTags);
router.post('/create', verifyAccessToken, createPost);
router.get('/:id', integratedAccessToken, getPostById);

router.delete('/:id/delete', verifyAccessToken, deletePost);
router.patch('/:id/update', verifyAccessToken, updatePost);
router.post('/:id/comment', verifyAccessToken, commentPost);

export default router;
