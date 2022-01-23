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
} from '../controllers/user.js';
import { verifyAccessToken } from '../helpers/jwt-service.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/update-info/:id', verifyAccessToken, updateInfo);
router.post('/unset-avt/:id', verifyAccessToken, unsetAvatar);
router.post('/update-avt/:id', verifyAccessToken, updateAvatar);
router.get('/:id', getUserById);

export default router;
