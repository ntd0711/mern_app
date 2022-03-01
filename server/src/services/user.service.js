import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import mongoose from 'mongoose';
import PostModel from '../models/post.js';
import UserModel from '../models/user.js';
import redisClient from '../helpers/connections-redis.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt-service.js';
import { updateInfoValidate, userValidate } from '../helpers/validation.js';
import { checkStatusVotePost } from '../helpers/common.js';

const UserService = {};

UserService.login = async (req) => {
  const { email, password } = req.body;

  const existingEmail = await UserModel.findOne({ email });
  if (!existingEmail) throw createError.NotFound("email-Account email is does't exist");

  const isPasswordCorrect = await bcrypt.compare(password, existingEmail.password);
  if (!isPasswordCorrect) throw createError.NotFound('password-The password invalid');

  const accessToken = await signAccessToken(existingEmail._id);
  const refreshToken = await signRefreshToken(existingEmail._id);

  return { user: existingEmail, token: accessToken, refreshToken };
};

UserService.logout = async (req) => {
  const { rfToken } = req.body;

  if (!rfToken) throw createError.BadRequest();

  const { userId } = await verifyRefreshToken(rfToken);
  await redisClient.del(userId.toString());

  return { message: 'logout success!' };
};

UserService.register = async (req) => {
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

  return { user: newUser, token: accessToken, refreshToken };
};

UserService.getUserById = async (req) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw createError.BadRequest('No user with that id');

  const user = await UserModel.findById(id).select(['-email', '-password']);

  return user;
};

UserService.getCreatedPostsByUser = async (req) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) throw createError.BadRequest('No user with that id');

  const createdPosts = (
    await UserModel.findById(id)
      .select('createdPosts -_id')
      .populate({
        path: 'createdPosts',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'author', select: 'name' },
      })
  ).createdPosts;

  for (const post of createdPosts) {
    const { likes, dislikes, usersSaved } = post;

    post.statusVote = checkStatusVotePost(likes, dislikes, id);
    post.point = likes.length - dislikes.length;
    post.savedByUser = usersSaved?.includes(id);
  }

  const total = createdPosts?.length;

  return { total, createdPosts };
};

UserService.getSavedPostsByUser = async (req) => {
  const userId = req.userId;

  const savedPosts = (
    await UserModel.findById(userId)
      .select('savedPosts -_id')
      .populate({
        path: 'savedPosts',
        options: { sort: { createdAt: 'desc' } },
        populate: { path: 'author', select: 'name' },
      })
      .sort({ createdAt: 'desc' })
  ).savedPosts;

  for (const post of savedPosts) {
    const { likes, dislikes, usersSaved } = post;

    post.statusVote = checkStatusVotePost(likes, dislikes, userId);
    post.point = likes.length - dislikes.length;
    post.savedByUser = usersSaved?.includes(userId);
  }

  const total = savedPosts?.length;

  return { userId, total, savedPosts };
};

UserService.savePost = async (req) => {
  const userId = req.userId;
  const { postId, actionType } = req.body;

  const promiseUser = UserModel.findOne({ _id: userId });
  const promisePost = PostModel.findOne({ _id: postId });

  const [user, post] = await Promise.all([promiseUser, promisePost]);

  switch (actionType) {
    case 'unSave': {
      user.savedPosts = user.savedPosts.filter((id) => String(id) !== postId);
      post.usersSaved = post.usersSaved.filter((id) => String(id) !== userId);

      // post.savedByUser = post.usersSaved.includes(userId) ? true : false;
      break;
    }
    case 'save': {
      const objPostId = new mongoose.Types.ObjectId(postId);
      user.savedPosts.addToSet(objPostId);

      const objUserId = new mongoose.Types.ObjectId(userId);
      post.usersSaved.addToSet(objUserId);
      // post.savedByUser = post.usersSaved.includes(userId) ? true : false;
      break;
    }
    default:
      break;
  }
  const [newPost] = await Promise.all([post.save(), user.save()]);

  const savedByUser = newPost.usersSaved.includes(userId) ? true : false;

  return { savedByUser, usersSaved: newPost.usersSaved };
};

UserService.votePost = async (req) => {
  const userId = req?.userId;
  const { voteType, postId } = req.body;

  const post = await PostModel.findOne({ _id: postId }).populate('author', 'name');

  switch (voteType) {
    case 'like': {
      post.likes.addToSet(userId);
      post.dislikes = post.dislikes.filter((id) => id !== String(userId));
      // post.statusVote = checkStatusVotePost(post.likes, post.dislikes, userId);
      break;
    }

    case 'dislike': {
      post.dislikes.addToSet(userId);
      post.likes = post.likes.filter((id) => id !== String(userId));
      // post.statusVote = checkStatusVotePost(post.likes, post.dislikes, userId);
      break;
    }

    case 'withdraw': {
      post.likes = post.likes.filter((id) => id !== String(userId));
      post.dislikes = post.dislikes.filter((id) => id !== String(userId));
      // post.statusVote = checkStatusVotePost(post.likes, post.dislikes, userId);
      break;
    }

    default:
      break;
  }
  post.point = post.likes.length - post.dislikes.length;
  const newPost = await post.save();

  const statusVote = checkStatusVotePost(newPost.likes, newPost.dislikes, userId);

  return { point: newPost.point, statusVote };
};

UserService.updateInfo = async (req) => {
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

  return { user: userUpdated };
};

UserService.unsetAvatar = async (req, res) => {
  const { id } = req.params;

  const newUser = await UserModel.findByIdAndUpdate(
    id,
    { avatar: '', updatedAt: Date.now() },
    { new: true }
  );

  return { user: newUser };
};

UserService.updateAvatar = async (req) => {
  const { id } = req.params;
  const { imgUrl } = req.body;

  const newUser = await UserModel.findByIdAndUpdate(
    id,
    { avatar: imgUrl, updatedAt: Date.now() },
    { new: true }
  );

  return { user: newUser };
};

UserService.refreshToken = async (req) => {
  const { rfToken } = req.body;
  if (!rfToken) throw createError.BadRequest('Refresh token invalid');

  const { userId } = await verifyRefreshToken(rfToken);
  if (!userId) throw createError.BadRequest();

  const accessToken = await signAccessToken(userId);
  const refreshToken = await signRefreshToken(userId);

  return {
    token: accessToken,
    refreshToken,
  };
};

export default UserService;
