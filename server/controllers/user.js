import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import mongoose from 'mongoose';
import PostModel from '../models/post.js';
import UserModel from '../models/user.js';
import redisClient from '../helpers/connections-redis.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt-service.js';
import { updateInfoValidate, userValidate } from '../helpers/validation.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    if (!existingEmail) throw createError.NotFound("email-Account email is does't exist");

    const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
    if (!isPasswordCorrect) throw createError.NotFound('password-The password invalid');

    const accessToken = await signAccessToken(existingEmail._id);
    const refreshToken = await signRefreshToken(existingEmail._id);

    res.status(200).json({ user: existingEmail, token: accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { rfToken } = req.body;

    if (!rfToken) throw createError.BadRequest();

    const { userId } = await verifyRefreshToken(rfToken);
    await redisClient.del(userId.toString());

    res.status(200).json({ message: 'logout success!' });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { error } = userValidate(req.body);
    if (error) return next(createError.BadRequest(error.details[0].message));

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail)
      throw createError.BadRequest('email-The email is already in use by another account.');

    if (password !== confirmPassword)
      throw createError.BadRequest('confirmPassword-Password not match.');

    const formUser = {
      name: `${firstName} ${lastName}`,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const newUser = await UserModel.create(formUser);

    const accessToken = await signAccessToken(newUser._id);
    const refreshToken = await signRefreshToken(newUser._id);

    res.status(200).json({ user: newUser, token: accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const listUser = await UserModel.find({});

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'No user with that id' });

    const userNeedToFind = listUser.find((user) => user._id.toString() === String(id));

    res.status(200).json(userNeedToFind);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updateInfo = async (req, res, next) => {
  try {
    const { error } = updateInfoValidate(req.body);
    if (error) {
      console.log(error);
      return next(createError.BadRequest(error.details[0].message));
    }

    const { id } = req.params;
    const info = req.body;

    const userUpdated = await UserModel.findByIdAndUpdate(
      id,
      { ...info, updatedAt: Date.now() },
      { new: true }
    );
    await PostModel.updateMany({ creatorId: id }, { creator: info.name });

    res.status(200).json({ user: userUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const unsetAvatar = async (req, res) => {
  if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' });

  try {
    const { id } = req.params;

    const userUpdated = await UserModel.findByIdAndUpdate(
      id,
      { avatar: '', updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({ user: userUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updateAvatar = async (req, res) => {
  if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' });

  try {
    const { id } = req.params;
    const { imgUrl } = req.body;

    const userUpdated = await UserModel.findByIdAndUpdate(
      id,
      { avatar: imgUrl, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json({ user: userUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { rfToken } = req.body;
    if (!rfToken) throw createError.BadRequest('Refresh token invalid');

    const { userId } = await verifyRefreshToken(rfToken);
    if (!userId) throw createError.BadRequest();

    const accessToken = await signAccessToken(userId);
    const refreshToken = await signRefreshToken(userId);

    res.status(200).json({
      token: accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
