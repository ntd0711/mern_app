import { asyncWrapper } from '../helpers/async-wrapper.js';
import UserService from '../services/user.service.js';

export const login = asyncWrapper(async (req, res, next) => {
  const data = await UserService.login(req);
  res.status(200).json(data);
});

export const logout = asyncWrapper(async (req, res, next) => {
  const message = await UserService.logout(req);
  res.status(200).json(message);
});

export const register = asyncWrapper(async (req, res, next) => {
  const data = await UserService.register(req);
  res.status(200).json(data);
});

export const getUserById = asyncWrapper(async (req, res) => {
  const user = await UserService.getUserById(req);
  res.status(200).json(user);
});

export const getCreatedPostsByUser = asyncWrapper(async (req, res) => {
  const data = await UserService.getCreatedPostsByUser(req);
  res.status(200).json(data);
});

export const getSavedPostsByUser = asyncWrapper(async (req, res, next) => {
  const data = await UserService.getSavedPostsByUser(req);
  res.status(200).json(data);
});

export const savePost = asyncWrapper(async (req, res) => {
  const data = await UserService.savePost(req);
  res.status(200).json(data);
});

export const votePost = asyncWrapper(async (req, res) => {
  const data = await UserService.votePost(req);
  res.status(200).json(data);
});

export const updateInfo = asyncWrapper(async (req, res) => {
  const newUser = await UserService.updateInfo(req);
  res.status(200).json(newUser);
});

export const unsetAvatar = asyncWrapper(async (req, res) => {
  const newUser = await UserService.unsetAvatar(req);
  res.status(200).json(newUser);
});

export const updateAvatar = asyncWrapper(async (req, res) => {
  const newUser = await UserService.updateAvatar(req);
  res.status(200).json(newUser);
});

export const refreshToken = asyncWrapper(async (req, res, next) => {
  const newTokens = await UserService.refreshToken(req);
  res.status(200).json(newTokens);
});
