import express from 'express';
import {
  login,
  logout,
  register,
  getUserById,
  refreshToken,
  unsetAvatar,
  updateAvatar,
  updateInfo,
  savePost,
  getCreatedPostsByUser,
  getSavedPostsByUser,
  votePost,
} from '../controllers/user.controller.js';
import { verifyAccessToken } from '../helpers/jwt-service.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/vote', verifyAccessToken, votePost);
router.get('/posts-saved', verifyAccessToken, getSavedPostsByUser);
router.post('/post/save', verifyAccessToken, savePost);
router.get('/posts-created/:id', getCreatedPostsByUser);
router.post('/update-info/:id', verifyAccessToken, updateInfo);
router.post('/unset-avt/:id', verifyAccessToken, unsetAvatar);
router.post('/update-avt/:id', verifyAccessToken, updateAvatar);
router.get('/:id', getUserById);

export default router;
