import express from 'express';
import {
    createPosts,
    getPosts,
    likePost,
    getPostsByUserId,
    getPostById,
    getTags,
} from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/create', auth, createPosts);
router.get('/tags', getTags);
router.get('/:id', getPostById);

router.post('/:id/like', auth, likePost);
router.get('/user/:id', auth, getPostsByUserId);

export default router;
