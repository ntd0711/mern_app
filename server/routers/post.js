import express from 'express';
import { createPosts, getPosts, likePost } from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createPosts);
router.post('/:id', auth, likePost);
router.get('/', getPosts);

export default router;
