import UserService from '../services/user.service.js';

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const message = await UserService.logout(req);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const data = await UserService.register(req);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCreatedPostsByUser = async (req, res) => {
  try {
    const data = await UserService.getCreatedPostsByUser(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSavedPostsByUser = async (req, res, next) => {
  try {
    const data = await UserService.getSavedPostsByUser(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const savePost = async (req, res) => {
  try {
    const data = await UserService.savePost(req);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const votePost = async (req, res) => {
  try {
    const data = await UserService.votePost(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateInfo = async (req, res) => {
  try {
    const newUser = await UserService.updateInfo(req);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const unsetAvatar = async (req, res) => {
  try {
    const newUser = await UserService.unsetAvatar(req);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const newUser = await UserService.updateAvatar(req);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const newTokens = await UserService.refreshToken(req);
    res.status(200).json(newTokens);
  } catch (error) {
    next(error);
  }
};
