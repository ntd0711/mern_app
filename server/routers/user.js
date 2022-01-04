import express from 'express';
import {
    signin,
    signup,
    getUserById,
    updateInfo,
    unsetAvatar,
    updateAvatar,
} from '../controllers/user.js';
import { upload } from '../helpers/file-helpers.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/update-info/:id', updateInfo);
router.post('/unset-avt/:id', unsetAvatar);
router.post('/update-avt/:id', upload.single('imgFile'), updateAvatar);
router.get('/:id', getUserById);

export default router;
